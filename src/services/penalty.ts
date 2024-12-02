import { ICreatePenaltyPlan } from '@/types/loans'
import { fetchData } from '@/utils/fetch-data'

export async function createPenaltyPlan(plan: ICreatePenaltyPlan) {
  const response = await fetchData({
    url: '/penalty',
    data: plan,
    method: 'POST',
    useToken: true,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data
}
