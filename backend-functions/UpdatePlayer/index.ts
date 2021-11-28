import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { PlayerEntity, PlayerEntry } from "../interfaces";
import { updatePlayer } from "../services/playerService";
import { parseUUID, toPlayerEntry } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (!req.body) {
      throw new Error("Request body is not defined.");
    }
    const id: string = parseUUID(req.params.id);
    const player: PlayerEntry = toPlayerEntry(req.body);
    const playerEntity: PlayerEntity = {
      ...player,
      dateOfBirth: new Date(player.dateOfBirth),
      partitionKey: "DefaultPartitionKey",
      rowKey: id,
    };

    await updatePlayer(playerEntity);
    context.res = { status: 200, body: `Resource updated successfully!` };
  } catch (e) {
    if (e.statusCode === 404) {
      context.res = { status: 404, body: e.message };
    }
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;
