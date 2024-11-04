import { getLoanById } from '@/services/loan'
import { useQuery } from '@tanstack/react-query'

export function useLoanDetails({ id }: { id: number }) {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['loan', id],
    queryFn: async () => {
      const response = await getLoanById(id)
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    },
  })

  return {
    loan: data,
    isLoading: isFetching,
    error,
    refetch,
  }
}
