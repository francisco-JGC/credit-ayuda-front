import { ICreateLoan } from '@/types/loans'
import { fetchData, IHandleResponse, IPagination } from '@/utils/fetch-data'

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
    url: `/loan/${page}/${limit}/${filter}`,
    method: 'GET',
    useToken: true,
  })
}

export const getLoanById = async (id: number): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/loan/${id}`,
    method: 'GET',
    useToken: true,
  })
}
