import parseMultipartFormData from "@anzp/azure-function-multipart";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { partitionKey, PlayerEntity, PlayerEntry } from "../interfaces";
import { addAvatar, updatePlayer } from "../services/playerService";
import { parseUUID, toPlayerEntry } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const id: string = parseUUID(req.params.id);
    const { fields, files } = await parseMultipartFormData(req);
    const file = files.find((file) => file.fieldname === "avatar");
    const player: PlayerEntry = toPlayerEntry(fields);
    const playerEntity: PlayerEntity = {
      ...player,
      hasAvatar: file ? true : player.hasAvatar,
      dateOfBirth: player.dateOfBirth ? player.dateOfBirth.toString() : "",
      partitionKey,
      rowKey: id,
    };

    if (file) {
      await addAvatar(file.bufferFile, playerEntity.rowKey);
    }

    await updatePlayer(playerEntity);
    context.res = { status: 200, body: `Resource updated successfully!` };
  } catch (e) {
    context.res = { status: e.statusCode === 404 ? 404 : 400, body: e.message };
  }
};

export default httpTrigger;
