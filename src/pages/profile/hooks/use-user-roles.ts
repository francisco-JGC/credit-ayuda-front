import { getRoles } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

export function useUserRoles() {
  const {
    data: roles,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      return await getRoles()
    },
  })

  return {
    roles,
    isLoading: isFetching,
    error,
  }
}
