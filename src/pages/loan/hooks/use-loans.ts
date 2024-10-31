import { getPaginationLoans } from '@/services/loan'
import { ILoanTable } from '@/types/loans'
import { IPaginationResponse } from '@/utils/fetch-data'
import { useQuery } from '@tanstack/react-query'

export function useLoans() {
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ['loans'],
    queryFn: async () => {
      const response = await getPaginationLoans({
        page: 1,
        limit: 20,
        filter: '',
      })
      if (!response.success) {
        throw new Error(response.message)
      }
      const data = response.data as IPaginationResponse<ILoanTable[]>
      return data.data ?? []
    },
  })

  return { data, isError, error, isLoading: isFetching }
}
