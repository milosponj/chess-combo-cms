import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Game, GameEntity, partitionKey } from "../interfaces";
import { getGame } from "../services/gameService";
import { parseUUID, toGameFromEntity } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const id: string = parseUUID(req.params.id);
    const result: GameEntity = await getGame(partitionKey, id);
    const response: Game = toGameFromEntity(result);
    context.res = {
      status: 200,
      body: response,
    };
  } catch (e) {
    context.res = { status: e.statusCode === 404 ? 404 : 400, body: e.message };
  }
};

export default httpTrigger;
