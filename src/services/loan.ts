import { ICreateLoan } from '@/types/loans'
import { fetchData, IHandleResponse } from '@/utils/fetch-data'

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
