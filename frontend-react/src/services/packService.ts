import { CreatePackData } from "../interfaces";

export const addPack = async (
  createPackForm: CreatePackData,
  functionKey: string
): Promise<Response> => {
  console.log("PROCESS ENV", process.env);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-functions-key": functionKey,
    },
    body: JSON.stringify(createPackForm),
  };
  console.log("PROCESS ENV STILL EMPTY", process.env);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PACK_HANDLER_FUNCTION_URL}/api/AddPack`,
    requestOptions
  );

  return response;
};

export const getPackBuyers = async (packId: number): Promise<Response> => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return await fetch(
    `${process.env.NEXT_PUBLIC_PACK_HANDLER_FUNCTION_URL}/api/GetPackBuyers?packId=${packId}`,
    requestOptions
  );
};

export const getPacks = async (): Promise<Response> => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  console.log("PROCESS ENV STILL EMPTY", process.env);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PACK_HANDLER_FUNCTION_URL}/api/GetPacks?source=table`,
    requestOptions
  );

  return response;
};
