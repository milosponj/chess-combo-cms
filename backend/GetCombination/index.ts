import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Combination, CombinationEntity } from "../interfaces";
import { getCombination } from "../services/combinationService";
import { parseUUID, toCombinationFromEntity } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const id: string = parseUUID(req.params.id);
    const result: CombinationEntity = await getCombination(
      "DefaultPartitionKey",
      id
    );
    const response: Combination = toCombinationFromEntity(result);
    context.res = {
      status: 200,
      body: response,
    };
  } catch (e) {
    if (e.statusCode === 404) {
      context.res = { status: 404, body: e.message };
    } else {
      context.res = { status: 400, body: e.message };
    }
  }
};

export default httpTrigger;
