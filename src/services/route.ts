import { ICreateRoute } from '@/types/routes'
import { fetchData, IHandleResponse, IPagination } from '@/utils/fetch-data'

export const createRoute = async (
  route: ICreateRoute,
): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/route/create',
    data: route,
    method: 'POST',
    useToken: true,
  })
}

export const getAllRoutes = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/route',
    method: 'GET',
    useToken: true,
  })
}

export const getPaginationRoutes = async ({
  filter,
  page,
  limit,
}: IPagination): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/route/${page}/${limit}/${filter}`,
    method: 'GET',
    useToken: true,
  })
}

export const getRouteById = async (id: number): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/route/${id}`,
    method: 'GET',
    useToken: true,
  })
}
