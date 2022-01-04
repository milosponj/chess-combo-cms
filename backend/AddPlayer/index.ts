import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { PlayerEntity, PlayerEntry } from "../interfaces";
import { v4 as uuid } from "uuid";
import { toPlayerEntry } from "../utils";
import { addAvatar, addPlayer } from "../services/playerService";
import parseMultipartFormData from "@anzp/azure-function-multipart";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { fields, files } = await parseMultipartFormData(req);
    const file = files.find((file) => file.fieldname === "avatar");
    const playerEntry: PlayerEntry = toPlayerEntry(fields);
    const playerEntity: PlayerEntity = {
      ...playerEntry,
      dateOfBirth: playerEntry.dateOfBirth
        ? playerEntry.dateOfBirth.toString()
        : "",
      partitionKey: "DefaultPartitionKey",
      rowKey: uuid(),
      hasAvatar: file ? true : false,
    };
    if (file) {
      await addAvatar(file.bufferFile, playerEntity.rowKey);
    }
    await addPlayer(playerEntity);

    context.res = { status: 201, body: `New player added.` };
  } catch (e) {
    console.log(e);
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;
