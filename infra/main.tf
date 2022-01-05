#Set up remote state
terraform {
  backend "azurerm" {  
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

resource "azurerm_storage_table" "combinationstable" {
  name                 = "combinations"
  storage_account_name = azurerm_storage_account.storage.name
}

resource "azurerm_storage_table" "playerstable" {
  name                 = "players"
  storage_account_name = azurerm_storage_account.storage.name
}

resource "azurerm_storage_table" "gamestable" {
  name                 = "games"
  storage_account_name = azurerm_storage_account.storage.name
}

resource "azurerm_app_service_plan" "app_service_plan" {
    name = "cms-service-plan-${var.env}"
    resource_group_name = "${azurerm_resource_group.rg.name}"
    location = "${var.location}"
    kind = "FunctionApp"
    sku {
        tier = "Dynamic"
        size = "Y1"
    }
}

resource "azurerm_application_insights" "cms_ai" {
  name                = "cms-${var.env}-appinsights"
  location            = var.location
  resource_group_name = "${azurerm_resource_group.rg.name}"
  application_type    = "web"
}

resource "azurerm_function_app" "function" {
    name = "cms-function-${var.env}"
    location = "${var.location}"
    resource_group_name = "${azurerm_resource_group.rg.name}"
    app_service_plan_id = "${azurerm_app_service_plan.app_service_plan.id}"
    
    storage_account_name = "${azurerm_storage_account.storage.name}"
    storage_account_access_key = "${azurerm_storage_account.storage.primary_access_key}"

    version = "~3"

    app_settings = {
        https_only = true
        FUNCTIONS_WORKER_RUNTIME = "node"
        FUNCTION_APP_EDIT_MODE = "readonly"
        APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.cms_ai.instrumentation_key
        WEBSITE_RUN_FROM_PACKAGE = "1"        
        AzureWebJobsStorage = azurerm_storage_account.storage.primary_connection_string
        WEBSITE_NODE_DEFAULT_VERSION = "~14"
    }
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
