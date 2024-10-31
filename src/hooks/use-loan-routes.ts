import { getAllRoutes } from '@/services/route'
import { IRoute } from '@/types/routes'
import { useQuery } from '@tanstack/react-query'

export function useLoanRoutes() {
  const { data, isFetching, error } = useQuery({
    queryKey: ['loan-routes'],
    queryFn: async () => {
      const response = await getAllRoutes()
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as IRoute[]
    },
  })

  return { data, isLoading: isFetching, error }
}
