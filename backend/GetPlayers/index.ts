import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Player, PlayerEntity } from "../interfaces";
import { getPlayers } from "../services/playerService";
import { toPlayerFromEntity } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const result: PlayerEntity[] = await getPlayers();
    const response: Player[] = result.map((playerEntity) =>
      toPlayerFromEntity(playerEntity)
    );

    context.res = {
      status: 200,
      body: response,
    };
  } catch (e) {
    context.res = { status: e.statusCode === 404 ? 404 : 500, body: e.message };
  }
};

export default httpTrigger;
