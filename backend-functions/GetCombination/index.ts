import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Combination, CombinationEntity } from "../interfaces";
import { getCombination } from "../services/tableStorageService";
import { parseUUID, toCombination } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const id: string = parseUUID(req.params.comboId);
    const result: CombinationEntity = await getCombination(
      "DefaultPartitionKey",
      id
    );
    const response: Combination = toCombination(result);

    context.res = {
      status: 200,
      body: response,
    };
  } catch (e) {
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;