import { createUser, getUsers } from '@/services/user'
import { UserCreate } from '@/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export function useCreateUser() {
  const queryCliennt = useQueryClient()
  const {
    mutateAsync: create,
    data: newUser,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (user: UserCreate) => {
      return await createUser(user)
    },
    onSuccess: () => {
      queryCliennt.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })

  return {
    create,
    newUser,
    error,
    isPending,
  }
}
