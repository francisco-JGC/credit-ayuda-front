import {
  ICreatePenaltyPlan,
  IPenaltyPaymentSchedule,
  IPenaltyPaymentScheduleCreate,
  IPenaltyPlan,
} from '@/types/loans'
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

export async function getPenalty(id: number) {
  const response = await fetchData<IPenaltyPlan>({
    url: `/penalty/${id}`,
    method: 'GET',
    useToken: true,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data
}

export async function addPenaltyPayment(
  id: number,
  payment: IPenaltyPaymentScheduleCreate,
) {
  const response = await fetchData({
    url: `/penalty/add-payment/${id}`,
    method: 'POST',
    data: payment,
    useToken: true,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data as IPenaltyPaymentSchedule
}
