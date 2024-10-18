import { ICreateRoute } from "@/types/routes";
import { fetchData, IHandleResponse } from "@/utils/fetch-data";

export const createRoute = async (
  route: ICreateRoute
): Promise<IHandleResponse> => {
  return await fetchData({
    url: "/route/create",
    data: route,
    method: "POST",
    useToken: true,
  });
};