import { getFilteredDatesLoans } from '@/services/loan'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useCredit({
  filter_type,
  date,
}: {
  filter_type: 'daily' | 'monthly'
  date: string
}) {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['credits'],
    queryFn: async () => {
      const response = await getFilteredDatesLoans({ filter_type, date })
      if (!response.success) {
        toast.error('Error al cargar la informacion', {
          description: response.message,
        })
      }
      return response.data
    },
  })

  return {
    credits: data,
    isLoading: isFetching,
    error,
    refetch,
  }
}
