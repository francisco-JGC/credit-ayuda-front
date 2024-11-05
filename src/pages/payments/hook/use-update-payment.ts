import { updatePayment } from '@/services/payments'
import { IPaymentSchedule } from '@/types/loans'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdatePayment({ loanId }: { loanId: number }) {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: async (newPaymentSchedule: IPaymentSchedule) => {
      return await updatePayment(newPaymentSchedule)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loan', loanId] })
    },
  })

  return { update: mutateAsync, isPending, error, isSuccess }
}
