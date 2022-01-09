import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { GameEntity, GameEntry } from "../interfaces";
import { v4 as uuid } from "uuid";
import { addGame } from "../services/gameService";
import { toGameEntry } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (!req.body) {
      throw new Error("Request body is not defined.");
    }
    const gameEntry: GameEntry = toGameEntry(req.body);
    const gameEntity: GameEntity = {
      ...gameEntry,
      whitePlayer: JSON.stringify(gameEntry.whitePlayer),
      blackPlayer: JSON.stringify(gameEntry.blackPlayer),
      date: gameEntry.date ? gameEntry.date.toString() : "",
      partitionKey: "DefaultPartitionKey",
      rowKey: uuid(),
    };

    await addGame(gameEntity);
    context.res = { status: 201, body: `New game added.` };
  } catch (e) {
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;
