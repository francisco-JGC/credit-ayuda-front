import { createPenaltyPlan } from '@/services/penalty'
import { ICreatePenaltyPlan } from '@/types/loans'
import { useMutation } from '@tanstack/react-query'

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
