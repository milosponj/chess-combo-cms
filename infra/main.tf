#Set up remote state
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraformstate"
    storage_account_name = "terraformstoragecombo"
    container_name       = "cms-state"
    key                  = "dev.terraform.tfstate"
  }
}

#configure azurerm provider
provider "azurerm" {
  features {}
}

#create resource group
resource "azurerm_resource_group" "rg" {
    name     = "${var.resource_group_name}-${var.env}"
    location = "${var.location}"
}

resource "azurerm_storage_account" "storage" {
  name                     = "${var.storage_account_name}${var.env}"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    environment = "${var.env}"
  }
}


resource "azurerm_application_insights" "cms_app_insights" {
  name                = "cms-app-insights-${var.env}"
  location            = var.location
  resource_group_name = "${azurerm_resource_group.rg.name}"
  application_type    = "web"
}


resource "azurerm_storage_account" "static_storage" {
  name                     = var.static_storage_account_name
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  static_website {
    index_document = "index.html"
  }
  
  tags = {
    environment = "${var.env}"
  }
}

resource "azurerm_app_service_plan" "cms_app_service_plan" {
  name                = "cms-service-plan-${var.env}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku {
    tier = "${var.app_service_plan_tier}"
    size = "${var.app_service_plan_size}"
  }
}

resource "azurerm_app_service" "chess_combo_cms_api" {
  name                = "combo-cms-api-${var.env}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.cms_app_service_plan.id

  site_config {
    use_32_bit_worker_process = true
    always_on = false
    dotnet_framework_version = "v4.0"
  }

  app_settings = {
    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.cms_app_insights.instrumentation_key
    ConnectionStrings__DefaultConnection = "${var.cms_connection_string}"
  }
}