import { ICreateLoan, ILoan } from '@/types/loans'
import {
  fetchData,
  IHandleResponse,
  IPagination,
  IPaginationResponse,
} from '@/utils/fetch-data'
import Cookies from 'js-cookie'

export const createLoan = async (
  loan: ICreateLoan,
): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/loan/create',
    method: 'POST',
    data: loan,
    useToken: true,
  })
}

export const getPaginationLoans = async ({
  filter,
  page,
  limit,
}: IPagination): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/loan/full/${page}/${limit}/${filter}`,
    method: 'GET',
    useToken: true,
  })
}

interface IGetLoans {
  page: number
  limit?: number
  dni?: string
  status?: string
  frequency?: string
  route?: string
}

export async function getLoans({
  page,
  limit,
  dni = '',
  status,
  frequency,
  route,
}: IGetLoans) {
  const token = Cookies.get('token')
  const url = new URL(import.meta.env.VITE_BASE_URL)
  url.pathname += `/loan/full/${page}/${limit}/${dni}`
  if (status) url.searchParams.append('status', status)
  if (frequency) url.searchParams.append('frequency', frequency)
  if (route) url.searchParams.append('route', route)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('Error al obtener los préstamos')
  }

  const { success, data, message } = (await response.json()) as IHandleResponse<
    IPaginationResponse<ILoan[]>
  >
  if (!success) {
    throw new Error(message)
  }
  return data
}

export async function getRequests({
  page,
  limit,
  dni = '',
  frequency,
  route,
}: IGetLoans) {
  const token = Cookies.get('token')
  const url = new URL(import.meta.env.VITE_BASE_URL)
  url.pathname += `/loan/requests/${page}/${limit}/${dni}`
  if (frequency) url.searchParams.append('frequency', frequency)
  if (route) url.searchParams.append('route', route)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('Error al obtener los préstamos')
  }

  const { success, data, message } = (await response.json()) as IHandleResponse<
    IPaginationResponse<ILoan[]>
  >
  if (!success) {
    throw new Error(message)
  }
  return data
}

export const getLoanById = async (
  id: number,
): Promise<IHandleResponse<ILoan>> => {
  return await fetchData<ILoan>({
    url: `/loan/${id}`,
    method: 'GET',
    useToken: true,
  })
}

export const updateLoan = async (
  loan: ILoan,
): Promise<IHandleResponse<ILoan>> => {
  return await fetchData<ILoan>({
    url: `/loan/update`,
    method: 'PUT',
    data: loan,
    useToken: true,
  })
}

export async function getLoansByRouteUser({
  page,
  limit,
  dni = '',
  status,
  frequency,
  route,
}: IGetLoans) {
  const token = Cookies.get('token')
  const url = new URL(import.meta.env.VITE_BASE_URL)
  url.pathname += `/loan/my-route/full/${page}/${limit}/${dni}`
  if (status) url.searchParams.append('status', status)
  if (frequency) url.searchParams.append('frequency', frequency)
  if (route) url.searchParams.append('route', route)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('Error al obtener los préstamos')
  }

  const { success, data, message } = (await response.json()) as IHandleResponse<
    IPaginationResponse<ILoan[]>
  >
  if (!success) {
    throw new Error(message)
  }
  return data
}

export const getFilteredDatesLoans = async ({
  filter_type,
  date,
}: {
  filter_type: 'daily' | 'monthly'
  date: string
}): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/loan/filter-type/${filter_type}/date/${date}/`,
    method: 'GET',
    useToken: true,
  })
}

export const getLoansByClientId = async (
  id: number,
): Promise<IHandleResponse<ILoan[]>> => {
  return await fetchData({
    url: `/loan/client/${id}`,
    method: 'GET',
    useToken: true,
  })
}
