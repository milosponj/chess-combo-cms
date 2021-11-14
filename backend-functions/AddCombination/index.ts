import { TableClient } from "@azure/data-tables";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { toNewCombinationEntry } from "../utils";
import { v4 as uuid } from "uuid";
import { NewCombinationEntry } from "../interfaces";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const client = TableClient.fromConnectionString(
    "UseDevelopmentStorage=true",
    "combinations"
  );

  try {
    const combinationEntry: NewCombinationEntry = toNewCombinationEntry(
      req.body
    );
    const combination = {
      ...combinationEntry,
      moves: JSON.stringify(combinationEntry.moves),
      game: JSON.stringify(combinationEntry.game),
      partitionKey: "DefaultPartitionKey",
      rowKey: uuid(),
    };
    await client.createEntity(combination);
    context.res = { status: 200, body: `New combination added, id: ${combination.rowKey}`};
  } catch (e) {
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;