import { TableClient } from "@azure/data-tables";
import { CombinationEntity } from "../interfaces";

export const addCombination = async (combination: CombinationEntity) => {
  try {
    const client = TableClient.fromConnectionString(
      process.env["AzureWebJobsStorage"],
      "combinations"
    );
    const response = await client.createEntity(combination);
    return response;
  } catch (error) {
    throw new Error("Error while inserting new combination.");
  }
};

export const getCombination = async (
  partitionKey: string,
  rowKey: string
): Promise<CombinationEntity> => {
  try {
    const client = TableClient.fromConnectionString(
      process.env["AzureWebJobsStorage"],
      "combinations"
    );
    const response = await client.getEntity<CombinationEntity>(
      partitionKey,
      rowKey
    );
    return response;
  } catch (error) {
    throw new Error("Failed to retrieve the combination.");
  }
};

export const getCombinations = async () => {
  try {
    const client = TableClient.fromConnectionString(
      process.env["AzureWebJobsStorage"],
      "combinations"
    );
    const entitiesIter = client.listEntities<CombinationEntity>();
    var entities: CombinationEntity[] = [];
    for await (const entity of entitiesIter) {
      entities.push(entity);
    }
    return entities;
  } catch (error) {
    throw new Error("Failed to retrieve combinations.");
  }
};
