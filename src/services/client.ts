import { ICreateClient } from "@/types/clients";
import { fetchData, IHandleResponse } from "@/utils/fetch-data";

export const createClient = async (
  product: ICreateClient
): Promise<IHandleResponse> => {
  return await fetchData({
    url: "/client/create",
    data: product,
    method: "POST",
    useToken: true,
  });
};