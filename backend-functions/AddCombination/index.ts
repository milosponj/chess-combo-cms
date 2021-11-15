import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { toNewCombinationEntry } from "../utils";
import { v4 as uuid } from "uuid";
import { CombinationEntity, NewCombinationEntry } from "../interfaces";
import { addCombination } from "../services/tableStorageService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const combinationEntry: NewCombinationEntry = toNewCombinationEntry(
      req.body
    );
    const combinationEntity : CombinationEntity= {
      ...combinationEntry,
      moves: JSON.stringify(combinationEntry.moves),
      game: JSON.stringify(combinationEntry.game),
      partitionKey: "DefaultPartitionKey",
      rowKey: uuid(),
    };

    const result = await addCombination(combinationEntity)
    context.res = { status: 200, body: `New combination added, ${JSON.stringify(result)}`};
  } catch (e) {
    context.res = { status: 400, body: e.message };
  }
};
export default httpTrigger;