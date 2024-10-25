import { IPaymentPlan } from "@/types/loans"
import { formatDate } from "@/utils/date-format"
import { formatLoanStatus } from "@/utils/format-loanState"
import { formatPrice } from "@/utils/price-format"

interface IProps {
  payment_plan: IPaymentPlan
}

export const PaymentSchedule = ({ payment_plan }: IProps) => {
  return (
    <div>
      <header className="grid grid-cols-4 bg-primary p-2 rounded-md font-semibold text-white">
        <span>Fecha de pago</span>
        <span>Abono</span>
        <span>Cantidad abonada</span>
        <span>Estado de abono</span>
      </header>
      <div className="max-h-[500px] overflow-auto">
        {
          payment_plan?.payment_schedules.map(schedule => {
            return (
              <div key={schedule.id} className="grid grid-cols-4 my-4 p-2 rounded-md bg-gray-50">
                <span>{formatDate(schedule.due_date)}</span>
                <span>{formatPrice(Number(schedule.amount_due))}</span>
                <span>{formatPrice(Number(schedule.amount_paid))}</span>
                <span
                  className={`${schedule.status === 'pending' ? 'text-yellow-600' : schedule.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}
                >{formatLoanStatus(schedule.status as any)}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}