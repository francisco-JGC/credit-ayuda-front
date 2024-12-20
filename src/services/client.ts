import { IClientTable, ICreateClient } from '@/types/clients'
import {
  fetchData,
  IHandleResponse,
  IPagination,
  IPaginationResponse,
} from '@/utils/fetch-data'

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

export const getClienByDni = async (
  dni: string,
): Promise<IHandleResponse<IPaginationResponse>> => {
  return (await fetchData({
    url: `/client/dni/${dni}`,
    method: 'GET',
    useToken: true,
  })) as any
}

interface IGetClients extends IPagination {
  route?: string
}

export const getPaginationClient = async ({
  filter,
  page,
  limit,
  route,
}: IGetClients) => {
  let url = `/client/${page}/${limit}/${filter}`
  if (route) {
    url += `?route=${route}`
  }

  return await fetchData<IPaginationResponse<IClientTable[]>>({
    url,
    method: 'GET',
    useToken: true,
  })
}

export const getClientById = async (
  id: number,
): Promise<IHandleResponse<IClientTable>> => {
  return await fetchData({
    url: `/client/${id}`,
    method: 'GET',
    useToken: true,
  })
}

export const updateClientById = async (
  id: number,
  client: ICreateClient,
): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/client/update/${id}`,
    method: 'POST',
    data: client,
    useToken: true,
  })
}

export const deleteClientById = async (
  id: number,
): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/client/delete/${id}`,
    method: 'DELETE',
    useToken: true,
  })
}
