import { formatDate } from "@/utils/date-format"
import { formatFrequency } from "@/utils/format-frequency"
import { formatPrice } from "@/utils/price-format"

interface IProps {
  frequency: any
  amount: number
  total_recovered: number
  interest_rate: number
  loan_date: string
  created_at: string
}

export const LoanDetails = ({ frequency, amount, total_recovered, interest_rate, loan_date, created_at }: IProps) => {
  return (
    <div>
      <header>
        <span className="font-semibold pb-4">Fecha de solicitud: <span className="font-normal">{formatDate(created_at)}</span></span>
      </header>

      <div>
        <div className="border-t-2 grid grid-cols-2 gap-4 items-center bg-white -mx-4 p-4">
          <span className="font-semibold">Frecuencia de pago: <span className="font-normal">{formatFrequency(frequency as any)}</span></span>
          <span className="font-semibold">Monto a desembolsar: <span className="font-normal">{formatPrice(Number(amount))}</span></span>
          <span className="font-semibold">Recuperación: <span className="font-normal">{formatPrice(Number(total_recovered))}</span></span>
          <span className="font-semibold">Tasa de interes: <span className="font-normal">{interest_rate} %</span></span>
          <span className="font-semibold">Beneficio: <span className="font-normal">{formatPrice(Number((amount * (interest_rate / 100))))}</span></span>
          <span className="font-semibold">Fecha de inicio: <span className="font-normal">{formatDate(loan_date)}</span></span>
        </div>
      </div>
    </div>
  )
}