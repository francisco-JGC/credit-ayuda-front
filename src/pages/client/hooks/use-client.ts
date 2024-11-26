import { getClientById } from '@/services/client'
import { useQuery } from '@tanstack/react-query'

export function useClient({ id }: { id: number }) {
  const { data, isFetching, error } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const response = await getClientById(id)
      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data
    },
  })

  return {
    client: data,
    isLoading: isFetching,
    error,
  }
}
