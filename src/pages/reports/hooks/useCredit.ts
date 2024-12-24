import { getFilteredDatesLoans } from '@/services/loan'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Credit {
  loan_id: number
  route_name: string
  collected: number
  pending_collected: number
  paid_installments: number
  pending_installments: number
}

interface CreditSummary {
  totalPayments: number
  totalPendingPayments: number
  totalAmountToCollect: number
  totalAmountCollected: number
  totalPendingAmount: number
}

export function useCredit({
  filter_type,
  date,
}: {
  filter_type: 'daily' | 'monthly'
  date: string
}) {
  const { data, isFetching, error, refetch } = useQuery<{
    credits: Credit[]
    summary: CreditSummary
  }>({
    queryKey: ['credits', filter_type, date],
    queryFn: async () => {
      const response = await getFilteredDatesLoans({ filter_type, date })

      if (!response.success) {
        toast.error('Error loading information', {
          description: response.message,
        })
        return { credits: [], summary: {} as CreditSummary }
      }

      const credits: Credit[] = response.data as any

      let totalPayments = 0
      let totalPendingPayments = 0
      let totalAmountCollected = 0
      let totalPendingAmount = 0

      credits?.forEach((loan) => {
        totalPayments += loan.paid_installments
        totalPendingPayments += loan.pending_installments
        totalAmountCollected += loan.collected
        totalPendingAmount += loan.pending_collected
      })

      const totalAmountToCollect = totalAmountCollected + totalPendingAmount

      return {
        credits,
        summary: {
          totalPayments,
          totalPendingPayments,
          totalAmountToCollect,
          totalAmountCollected,
          totalPendingAmount,
        },
      }
    },
  })

  return {
    credits: data?.credits || [],
    summary: data?.summary || {
      totalPayments: 0,
      totalPendingPayments: 0,
      totalAmountToCollect: 0,
      totalAmountCollected: 0,
      totalPendingAmount: 0,
    },
    isLoading: isFetching,
    error,
    refetch,
  }
}
