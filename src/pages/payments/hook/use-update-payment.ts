import { updatePayment } from '@/services/payments'
import { IPaymentSchedule } from '@/types/loans'
import { useMutation } from '@tanstack/react-query'

export function useUpdatePayment() {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async (newPaymentSchedule: IPaymentSchedule) => {
      return await updatePayment(newPaymentSchedule)
    },
  })

  return { update: mutate, isPending, error, isSuccess }
}
