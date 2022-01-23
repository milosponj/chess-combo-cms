import { TableClient } from "@azure/data-tables";
import { GameEntity } from "../interfaces";

export const getGame = async (
  partitionKey: string,
  rowKey: string
): Promise<GameEntity> => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "games"
  );
  const response = await client.getEntity<GameEntity>(partitionKey, rowKey);
  return response;
};

export const getGames = async () => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "games"
  );
  const entitiesIter = client.listEntities<GameEntity>();
  var entities: GameEntity[] = [];
  for await (const entity of entitiesIter) {
    entities.push(entity);
  }
  return entities;
};

export const addGame = async (game: GameEntity) => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "games"
  );
  const response = await client.createEntity(game);
  return response;
};

export const updateGame = async (game: GameEntity) => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "games"
  );
  const response = await client.updateEntity(game);
  return response;
};
