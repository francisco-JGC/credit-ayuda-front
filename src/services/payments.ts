import { IPaymentSchedule } from '@/types/loans'
import { IHandleResponse } from '@/utils/fetch-data'
import Cookies from 'js-cookie'

export async function updatePayment(paymentSchedule: IPaymentSchedule) {
  const token = Cookies.get('token')
  const url = new URL(import.meta.env.VITE_BASE_URL)
  url.pathname = `/api/payments/update`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentSchedule),
  })

  if (!response.ok) {
    throw new Error('Error updating payment')
  }

  const data = (await response.json()) as IHandleResponse<IPaymentSchedule>
  return data.data
}
