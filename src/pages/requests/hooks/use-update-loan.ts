import { updateLoan } from '@/services/loan'
import { ILoan } from '@/types/loans'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateLoan() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (loan: ILoan) => {
      const response = await updateLoan(loan)
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
    },
  })

  return {
    update: mutateAsync,
    isLoading: isPending,
    error,
  }
}
