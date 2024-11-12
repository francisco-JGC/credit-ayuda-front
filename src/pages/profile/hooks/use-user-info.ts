import { useAuth } from '@/components/protectedRoute/authProvider'
import { getUser } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

export function useUserInfo() {
  const { user } = useAuth()
  const username = user?.username
  const {
    data: userInfo,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', username],
    queryFn: async () => {
      return await getUser(username as string)
    },
    enabled: !!user,
  })

  return {
    userInfo,
    user,
    isLoading: isFetching,
    error,
    refetch,
  }
}
