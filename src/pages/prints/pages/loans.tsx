import { useLoanDetails } from '@/pages/payments/hook/use-loan-details'
import { frequencyMap, paymentStatusMap } from '@/utils/contants'
import { formatDateLong } from '@/utils/date-format'
import { formatPrice } from '@/utils/price-format'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function LoansPrint() {
  const { loanId } = useParams()
  const { loan, isLoading } = useLoanDetails({ id: Number(loanId) })

  useEffect(() => {
    if (isLoading || loan == null) {
      return
    }
    window.print()
  }, [loan, isLoading])

  if (loan == null || isLoading) {
    return (
      <div className="container h-screen mx-auto grid place-content-center">
        Cargando...
      </div>
    )
  }

  const { client } = loan
  const lastPayment = loan.payment_plan.payment_schedules
    .sort(
      (a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime(),
    )
    .filter((payment) => payment.status === 'paid')[0]

  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">Cliente: {client.name}</h3>
        </div>
        <div className="text-sm">{formatDateLong(loan.created_at)}</div>
      </div>
      <section className="mt-2 text-sm">
        <div className="flex flex-col">
          <p>Cédula: {client.dni}</p>
          <p>Teléfono: {client.primary_phone}</p>
          <p>Dirección: {client.primary_address}</p>
          <p>Tipo de negocio: {client.business_type}</p>
        </div>
      </section>
      <section className="mt-4">
        <div>
          <h3 className="text-lg font-bold">Detalles del préstamo</h3>
          <p className="text-muted-foreground">#{loan.id}</p>
          <div className="mt-6">
            <table className="text-sm w-full table-fixed">
              <tbody>
                <tr className="even:bg-slate-500 odd:bg-white">
                  <td className="font-bold">Fecha del crédito:</td>
                  <td className="">{formatDateLong(loan.loan_date)}</td>
                  <td className="font-bold">Inicio:</td>
                  <td className="">{formatDateLong(loan.created_at)}</td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Tipo:</td>
                  <td className="">
                    {frequencyMap[loan.payment_plan.frequency]}
                  </td>
                  <td className="font-bold">Última cuota:</td>
                  <td className="">
                    {lastPayment != null &&
                      formatDateLong(lastPayment.due_date)}
                  </td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Monto:</td>
                  <td className="">C${formatPrice(loan.amount)}</td>
                  <td className="font-bold">Interés:</td>
                  <td className="">{loan.interest_rate}%</td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Recuperación:</td>
                  <td className="">C${formatPrice(loan.total_recovered)}</td>
                  <td className="font-bold">Cuota:</td>
                  <td className="">
                    C${formatPrice(loan.payment_plan.payment_amount)}
                  </td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Monto abonado:</td>
                  <td className="">
                    C$
                    {formatPrice(+loan.total_recovered - +loan.total_pending)}
                  </td>
                  <td className="font-bold">Total Abonos:</td>
                  <td className="">{loan.payment_plan.total_payments}</td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Monto pendiente:</td>
                  <td className="">
                    C$
                    {formatPrice(loan.total_pending)}
                  </td>
                  <td className="font-bold">Total Abonos pendientes:</td>
                  <td className="">{loan.payment_plan.payments_remaining}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-4 text-sm">
        <h3 className="text-xl font-bold my-4">Abonos</h3>
        <table className="w-full">
          <thead>
            <tr className="[&>th]:text-left">
              <th>#</th>
              <th>Abonado</th>
              <th>Restante</th>
              <th>Fecha de pago</th>
              <th>Fecha de abono</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {loan.payment_plan.payment_schedules.map((payment) => (
              <tr key={payment.id} className="even:bg-slate-200 odd:bg-white">
                <td>{payment.id}</td>
                <td>{formatPrice(Number(payment.amount_paid))}</td>
                <td>{formatPrice(Number(payment.amount_due))}</td>
                <td>{formatDateLong(payment.due_date)}</td>
                <td>
                  {payment.paid_date != null &&
                    formatDateLong(payment.paid_date.toString())}
                </td>
                <td>{paymentStatusMap[payment.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
