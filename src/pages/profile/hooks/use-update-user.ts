import { updateUser } from '@/services/user'
import { User } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

export function useUpdateUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (user: User) => {
      return await updateUser(user)
    },
  })

  return {
    updateUser: mutateAsync,
    isPending,
  }
}
