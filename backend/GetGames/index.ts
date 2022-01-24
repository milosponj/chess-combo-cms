import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Game, GameEntity } from "../interfaces";
import { getGames } from "../services/gameService";
import { toGameFromEntity } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const result: GameEntity[] = await getGames();
    const response: Game[] = result.map((gameEntity) =>
      toGameFromEntity(gameEntity)
    );

    context.res = {
      status: 200,
      body: response,
    };
  } catch (e) {
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;
