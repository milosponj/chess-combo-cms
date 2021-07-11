#Set up remote state
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraformstate"
    storage_account_name = "terraformstoragecms"
    container_name       = "terraform"
    key                  = "dev.terraform.tfstate"
  }
}

#configure azurerm provider
provider "azurerm" {
  features {}
}

#create resource group
resource "azurerm_resource_group" "rg" {
    name     = var.resource_group_name
    location = "westeurope"
}

resource "azurerm_storage_account" "storage" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
	
  static_website {
    index_document = "index.html"
  }
  
  tags = {
    environment = "dev"
  }
}