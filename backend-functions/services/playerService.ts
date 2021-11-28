import { TableClient } from "@azure/data-tables";
import { PlayerEntity, PlayerEntry } from "../interfaces";

export const getPlayers = async () => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "players"
  );
  const entitiesIter = client.listEntities<PlayerEntity>();
  var entities: PlayerEntity[] = [];
  for await (const entity of entitiesIter) {
    entities.push(entity);
  }
  return entities;
};

export const getPlayer = async (
  partitionKey: string,
  rowKey: string
): Promise<PlayerEntity> => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "players"
  );
  const response = await client.getEntity<PlayerEntity>(partitionKey, rowKey);
  return response;
};

export const addPlayer = async (player: PlayerEntity) => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "players"
  );
  const response = await client.createEntity(player);
  return response;
};

export const updatePlayer = async (player: PlayerEntity) => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "players"
  );

  const response = await client.updateEntity(player);
  return response;
};
