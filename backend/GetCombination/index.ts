import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Combination, CombinationEntity, partitionKey } from "../interfaces";
import { getCombination } from "../services/combinationService";
import { parseUUID, toCombinationFromEntity } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const id: string = parseUUID(req.params.id);
    const result: CombinationEntity = await getCombination(
      partitionKey,
      id
    );
    const response: Combination = toCombinationFromEntity(result);
    context.res = {
      status: 200,
      body: response,
    };
  } catch (e) {
    context.res = { status: e.statusCode === 404 ? 404 : 500, body: e.message };
  }
};

export default httpTrigger;
