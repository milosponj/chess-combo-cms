import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { PlayerEntity, PlayerEntry } from "../interfaces";
import { v4 as uuid } from "uuid";
import { toPlayerEntry } from "../utils";
import { addPlayer } from "../services/playerService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (!req.body) {
      throw new Error("Request body is not defined.");
    }
    const playerEntry: PlayerEntry = toPlayerEntry(req.body);
    const playerEntity: PlayerEntity = {
      ...playerEntry,
      dateOfBirth: playerEntry.dateOfBirth,
      partitionKey: "DefaultPartitionKey",
      rowKey: uuid(),
    };

    await addPlayer(playerEntity);
    context.res = { status: 201, body: `New player added.` };
  } catch (e) {
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;
