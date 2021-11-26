import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { toCombinationEntry } from "../utils";
import { v4 as uuid } from "uuid";
import { CombinationEntity, CombinationEntry } from "../interfaces";
import { addCombination } from "../services/combinationService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (!req.body) {
      throw new Error("Request body is not defined.");
    }
    const combinationEntry: CombinationEntry = toCombinationEntry(req.body);
    const combinationEntity: CombinationEntity = {
      ...combinationEntry,
      moves: JSON.stringify(combinationEntry.moves),
      game: JSON.stringify(combinationEntry.game),
      partitionKey: "DefaultPartitionKey",
      rowKey: uuid(),
    };

    await addCombination(combinationEntity);
    context.res = { status: 201, body: `New combination added.` };
  } catch (e) {
    context.res = { status: 400, body: e.message };
  }
};
export default httpTrigger;
