import { updateUser } from '@/services/user'
import { User } from '@/types/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (user: User) => {
      return await updateUser(user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    updateUser: mutateAsync,
    isPending,
  }
}
