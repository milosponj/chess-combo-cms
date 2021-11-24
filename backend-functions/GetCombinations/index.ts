import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Combination, CombinationEntity } from "../interfaces";
import { getCombinations } from "../services/tableStorageService";
import { toCombinationFromEntity } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const result: CombinationEntity[] = await getCombinations();
    const response: Combination[] = result.map((comboEntity) =>
      toCombinationFromEntity(comboEntity)
    );

    context.res = {
      status: 200,
      body: response,
    };
  } catch (e) {
    context.res = { status: 400, body: e.message };
  }
};

export default httpTrigger;
