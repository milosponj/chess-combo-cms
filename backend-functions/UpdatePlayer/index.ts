import parseMultipartFormData from "@anzp/azure-function-multipart";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { PlayerEntity, PlayerEntry } from "../interfaces";
import { updatePlayer } from "../services/playerService";
import { parseUUID, toPlayerEntry } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { fields, files } = await parseMultipartFormData(req);
    const file = files.find((file) => file.fieldname === "avatar");
    const id: string = parseUUID(req.params.id);
    const player: PlayerEntry = toPlayerEntry(fields);
    const playerEntity: PlayerEntity = {
      ...player,
      hasAvatar: file ? true : false,
      dateOfBirth: player.dateOfBirth ? player.dateOfBirth.toString() : "",
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
