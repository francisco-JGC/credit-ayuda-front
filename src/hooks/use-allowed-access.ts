import { useAuth } from '@/components/protectedRoute/authProvider'
import { isAllowedAccess } from '@/services/access'
import { useQuery } from '@tanstack/react-query'

export function useAllowedAccess() {
  const { user } = useAuth()
  const role = user?.role
  const { data: allowed, isFetching } = useQuery({
    queryFn: async () => {
      return await isAllowedAccess(role!)
    },
    queryKey: ['allowed-access', role],
    enabled: !!user,
  })

  return {
    allowed,
    isLoading: isFetching,
  }
}
