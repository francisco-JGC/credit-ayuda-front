import { ICreateClient } from '@/types/clients'
import { fetchData, IHandleResponse, IPagination } from '@/utils/fetch-data'

export const createClient = async (
  product: ICreateClient,
): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/client/create',
    data: product,
    method: 'POST',
    useToken: true,
  })
}

export const getClienByDni = async (dni: string): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/client/dni/${dni}`,
    method: 'GET',
    useToken: true,
  })
}

export const getPaginationClient = async ({
  filter,
  page,
  limit,
}: IPagination): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/client/${page}/${limit}/${filter}`,
    method: 'GET',
    useToken: true,
  })
}
