import { TableClient } from "@azure/data-tables";
import { GameEntity } from "../interfaces";

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
