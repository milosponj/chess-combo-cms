import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { partitionKey, PlayerEntity, PlayerEntry } from "../interfaces";
import { v4 as uuid } from "uuid";
import { toPlayerEntry } from "../utils";
import { addAvatar, addPlayer } from "../services/playerService";
import parseMultipartFormData from "@anzp/azure-function-multipart";
import { getAuthResult } from "../services/auth";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const authResult = await getAuthResult(token)
  if (!authResult.email) {
    context.res = { status: 401, body: authResult.error };
  }

  try {
    const { fields, files } = await parseMultipartFormData(req);
    const file = files.find((file) => file.fieldname === "avatar");
    const playerEntry: PlayerEntry = toPlayerEntry(fields);
    const playerEntity: PlayerEntity = {
      ...playerEntry,
      dateOfBirth: playerEntry.dateOfBirth
        ? playerEntry.dateOfBirth.toString()
        : "",
      partitionKey,
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
