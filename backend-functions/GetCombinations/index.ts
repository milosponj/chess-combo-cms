import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Combination } from "../interfaces";
import { getCombinations } from "../services/tableStorageService";
import { toCombination } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const result = await getCombinations();
    const response: Combination[] = result.map((comboEntity) =>
      toCombination(comboEntity)
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
