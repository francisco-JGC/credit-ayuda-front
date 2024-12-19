import { useAuth } from '@/components/protectedRoute/authProvider'
import { isAllowedAccess } from '@/services/access'
import { useQuery } from '@tanstack/react-query'

export function useAllowedAccess() {
  const { user } = useAuth()
  const role = user?.role

  const { data: allowed, isFetching } = useQuery({
    queryFn: async () => {
      const response = (await isAllowedAccess(role!)) as any

      if (response.success) {
        return response.data.allowed
      }

      return false
    },
    queryKey: ['allowed-access', role],
    enabled: !!user,
  })

  return {
    allowed,
    isLoading: isFetching,
    user,
  }
}
