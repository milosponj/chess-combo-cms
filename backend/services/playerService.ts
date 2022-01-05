import { TableClient } from "@azure/data-tables";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { PlayerEntity } from "../interfaces";

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

export const addAvatar = async (
  file: Buffer | null,
  playerId: string
): Promise<string[]> => {
  if (!file) return [];

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env["AzureWebJobsStorage"]
  );
  const containerClient: ContainerClient =
    blobServiceClient.getContainerClient("avatars");
  await containerClient.createIfNotExists({
    access: "container",
  });
  const blobClient = containerClient.getBlockBlobClient(`${playerId}.png`);
  const options = { blobHTTPHeaders: { blobContentType: "image/png" } };
  await blobClient.uploadData(file, options);
};

export const updatePlayer = async (player: PlayerEntity) => {
  const client = TableClient.fromConnectionString(
    process.env["AzureWebJobsStorage"],
    "players"
  );

  const response = await client.updateEntity(player);
  return response;
};
