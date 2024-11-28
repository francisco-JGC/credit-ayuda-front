import { getPayment } from '@/services/payments'
import { useQuery } from '@tanstack/react-query'

export function usePaymentDetails({ id }: { id: number }) {
  const { data, isFetching, error } = useQuery({
    queryKey: ['payment', id],
    queryFn: async () => {
      const payment = await getPayment(id)
      return payment
    },
  })

  return {
    payment: data,
    isLoading: isFetching,
    error,
  }
}
