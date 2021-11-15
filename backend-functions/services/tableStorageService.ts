import { TableClient } from "@azure/data-tables";
import { CombinationEntity } from "../interfaces";

export const addCombination = async (combination: CombinationEntity) => {
  try {
    const client = TableClient.fromConnectionString(
      "UseDevelopmentStorage=true",
      "combinations"
    );
    const response = await client.createEntity(combination);
    return response;
  } catch (error) {
    console.log(
      "Error while inserting new combinations, error message: ",
      error.message
    );
  }
};

export const getCombination = async (partitionKey: string, rowKey: string) => {
  try {
    const client = TableClient.fromConnectionString(
      "UseDevelopmentStorage=true",
      "combinations"
    );
    const response = await client.getEntity<CombinationEntity>(partitionKey, rowKey);
    return response;
  } catch (error) {
    console.log(
      "Failed to retrieve the combination, error message: ",
      error.message
    );
  }
};