import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { GameEntity, GameEntry } from "../interfaces";
import { updateGame } from "../services/gameService";
import { parseUUID, toGameEntry } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (!req.body) {
      throw new Error("Request body is not defined.");
    }
    const id: string = parseUUID(req.params.id);
    const game: GameEntry = toGameEntry(req.body);
    const gameEntity: GameEntity = {
      ...game,
      blackPlayer: JSON.stringify(game.blackPlayer),
      whitePlayer: JSON.stringify(game.whitePlayer),
      date: game.date ? game.date.toString() : "",
      partitionKey: "DefaultPartitionKey",
      rowKey: id,
    };

    await updateGame(gameEntity);
    context.res = { status: 200, body: `Resource updated successfully!` };
  } catch (e) {
    if (e.statusCode === 404) {
      context.res = { status: 404, body: e.message };
    }
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;
