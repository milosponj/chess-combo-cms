import { TableClient } from "@azure/data-tables";
import { CombinationEntity } from "../interfaces";

export const addCombination = async (combination: CombinationEntity) => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "combinations"
  );
  const response = await client.createEntity(combination);
  return response;
};

export const updateCombination = async (combination: CombinationEntity) => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "combinations"
  );

  const response = await client.updateEntity(combination);
  return response;
};

export const getCombination = async (
  partitionKey: string,
  rowKey: string
): Promise<CombinationEntity> => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "combinations"
  );
  const response = await client.getEntity<CombinationEntity>(
    partitionKey,
    rowKey
  );
  return response;
};

export const getCombinations = async () => {
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
};
