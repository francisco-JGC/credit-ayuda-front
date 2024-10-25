import { formatDate } from "@/utils/date-format"
import { formatFrequency } from "@/utils/format-frequency"
import { formatPrice } from "@/utils/price-format"
import { useEffect, useState } from "react"

interface IProps {
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'
  loan_date: string
  amount: number
  total_recovered: number
  interest_rate: number
  total_payments: number
}

interface IPreviewPaymentSchedule {
  number: number,
  payment: number,
  payment_date: string,
  status: 'pending'
}

export const PreviewPaymentSchedule = ({ frequency, total_recovered, amount, interest_rate, loan_date, total_payments
}: IProps) => {
  const [paymentSchedule, setPaymentSchedule] = useState<IPreviewPaymentSchedule[]>([])

  useEffect(() => {
    const schedules: IPreviewPaymentSchedule[] = [];

    const addDaysSkippingWeekends = (date: Date, days: number): Date => {
      let newDate = new Date(date);
      let addedDays = 0;

      while (addedDays < days) {
        newDate.setDate(newDate.getDate() + 1);

        if (newDate.getDay() !== 0 && newDate.getDay() !== 6) {
          addedDays++;
        }
      }
      return newDate;
    };

    const addMonths = (date: Date, months: number): Date => {
      let newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + months);
      return newDate;
    };

    const paymentWithoutDecimals = Math.floor(total_recovered / total_payments);
    const totalCalculated = paymentWithoutDecimals * total_payments;
    const remainder = total_recovered - totalCalculated;

    let currentDueDate = new Date(loan_date);
    let nextDueDate: any;

    for (let i = 1; i <= total_payments; i++) {
      switch (frequency) {
        case 'daily':
          nextDueDate = addDaysSkippingWeekends(new Date(currentDueDate), 1);
          break;
        case 'weekly':
          nextDueDate = new Date(currentDueDate);
          nextDueDate.setDate(nextDueDate.getDate() + 7);
          break;
        case 'biweekly':
          nextDueDate = new Date(currentDueDate);
          nextDueDate.setDate(nextDueDate.getDate() + 14);
          break;
        case 'monthly':
          nextDueDate = addMonths(new Date(currentDueDate), 1);
          break;
        case 'yearly':
          nextDueDate = addMonths(new Date(currentDueDate), 12);
          break;
        default:
          nextDueDate = '';
      }

      const payment = i === total_payments
        ? paymentWithoutDecimals + remainder
        : paymentWithoutDecimals;

      schedules.push({
        number: i,
        payment: payment,
        payment_date: nextDueDate,
        status: 'pending'
      });

      currentDueDate = nextDueDate;
    }

    setPaymentSchedule(schedules);

  }, [frequency, total_recovered, loan_date, interest_rate, total_payments]);



  return (
    <div className="w-full md:w-2/4 p-4 rounded-lg bg-gray-50">
      <div className="flex flex-col gap-3">
        <div>
          <span className="font-bold">Plan de pago</span>
        </div>
        <div className="border-t-2 grid grid-cols-2 gap-4 items-center bg-white -mx-4 p-4">
          <span className="font-semibold">Frecuencia de pago: <span className="font-normal">{formatFrequency(frequency as any)}</span></span>
          <span className="font-semibold">Monto a desembolsar: <span className="font-normal">{formatPrice(Number(amount))}</span></span>
          <span className="font-semibold">Recuperación: <span className="font-normal">{formatPrice(total_recovered)}</span></span>
          <span className="font-semibold">Tasa de interes: <span className="font-normal">{interest_rate} %</span></span>
          <span className="font-semibold">Beneficio: <span className="font-normal">{formatPrice((amount * (interest_rate / 100)))}</span></span>
          <span className="font-semibold">Fecha de inicio: <span className="font-normal">{formatDate(loan_date)}</span></span>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-5 gap-2 p-2 bg-primary text-white font-semibold">
          <span>#</span>
          <span>Abono</span>
          <span className="col-span-2">Fecha de pago</span>
          <span>Estado</span>
        </div>
        <div className="max-h-[250px] overflow-auto">
          {
            paymentSchedule.length > 0 &&
            (paymentSchedule.map((item) => {
              return (<div key={item.number} className={`grid grid-cols-5 gap-2 p-2 rounded ${item.number % 2 === 0 && 'bg-gray-200'}`}>
                <span>{item.number}</span>
                <span>{item.payment}</span>
                <span className="col-span-2">{formatDate(item.payment_date)}</span>
                <span className="bg-yellow-500 flex items-center justify-center rounded-lgs">Pendiente</span>
              </div>)
            }))
          }
        </div>
      </div>
    </div>
  )
}