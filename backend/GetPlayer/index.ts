import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { partitionKey, Player, PlayerEntity } from "../interfaces";
import { getPlayer } from "../services/playerService";
import { parseUUID, toPlayerFromEntity } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const id: string = parseUUID(req.params.id);
    const result: PlayerEntity = await getPlayer(partitionKey, id);
    const response: Player = toPlayerFromEntity(result);
    context.res = {
      status: 200,
      body: response,
    };
  } catch (e) {
    context.res = { status: e.statusCode === 404 ? 404 : 500, body: e.message };
  }
};

export default httpTrigger;
