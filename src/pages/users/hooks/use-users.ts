import { getUsers } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

export function useUsers() {
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await getUsers()
    },
  })

  return {
    users: data,
    error,
    isLoading: isFetching,
    refetch,
  }
}
