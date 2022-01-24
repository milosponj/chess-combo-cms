import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  CombinationEntity,
  CombinationEntry,
  partitionKey,
} from "../interfaces";
import { updateCombination } from "../services/combinationService";
import { parseUUID, toCombinationEntry } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (!req.body) {
      throw new Error("Request body is not defined.");
    }
    const id: string = parseUUID(req.params.id);
    const combination: CombinationEntry = toCombinationEntry(req.body);
    const combinationEntity: CombinationEntity = {
      ...combination,
      moves: JSON.stringify(combination.moves),
      game: JSON.stringify(combination.game),
      partitionKey,
      rowKey: id,
    };

    await updateCombination(combinationEntity);
    context.res = { status: 200, body: `Resource updated successfully!` };
  } catch (e) {
    context.res = { status: e.statusCode === 404 ? 404 : 400, body: e.message };
  }
};

export default httpTrigger;
