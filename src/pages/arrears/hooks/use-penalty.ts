import {
  addPenaltyPayment,
  createPenaltyPlan,
  getPenalty,
} from '@/services/penalty'
import {
  ICreatePenaltyPlan,
  IPenaltyPaymentScheduleCreate,
} from '@/types/loans'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useCreatePenalty() {
  const {
    data: plan,
    error,
    isPending,
    mutateAsync: createPlan,
  } = useMutation({
    mutationFn: async (penalty: ICreatePenaltyPlan) => {
      return await createPenaltyPlan(penalty)
    },
  })

  return {
    plan,
    error,
    isPending,
    createPlan,
  }
}

export function usePenalty({ id }: { id: number }) {
  const {
    data: penaltyPlan,
    isFetching: isLoading,
    error,
  } = useQuery({
    queryKey: ['penalty', id],
    queryFn: async () => {
      return await getPenalty(id)
    },
  })

  return {
    penaltyPlan,
    isLoading,
    error,
  }
}

export function useAddPenaltyPayment({ id }: { id: number }) {
  const queryClient = useQueryClient()
  const {
    data: penaltyPayment,
    isPending,
    error,
    mutateAsync: addPayment,
  } = useMutation({
    mutationFn: async (penaltyPayment: IPenaltyPaymentScheduleCreate) => {
      return await addPenaltyPayment(id, penaltyPayment)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['penalty', id],
      })
    },
  })

  return {
    penaltyPayment,
    isPending,
    error,
    addPayment,
  }
}
