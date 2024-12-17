import { usePaymentDetails } from '@/pages/payments/hook/use-payment-details'
import { frequencyMap, paymentStatusMap } from '@/utils/contants'
import { formatDateLong } from '@/utils/date-format'
import { formatPrice } from '@/utils/price-format'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

export function PaymentsPrintPage() {
  const { paymentId } = useParams()
  const { isLoading, payment } = usePaymentDetails({
    id: Number(paymentId),
  })
  const firstRender = useRef(true)

  useEffect(() => {
    if (!firstRender.current || payment == null) {
      return
    }
    firstRender.current = false
    window.print()
  }, [payment])

  if (isLoading || payment == null) {
    return (
      <div className="container h-screen mx-auto grid place-content-center">
        Cargando...
      </div>
    )
  }

  const client = payment.payment_plan.loan.client
  const paymentPlan = payment.payment_plan

  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">Cliente: {client.name}</h3>
        </div>
        <div className="text-sm">
          {formatDateLong(paymentPlan.loan.created_at ?? '')}
        </div>
      </div>
      <section className="mt-2 text-sm">
        <div className="flex flex-col">
          <p>Cédula: {client.dni}</p>
          <p>Teléfono: {client.primary_phone}</p>
          <p>Dirección: {client.primary_address}</p>
          <p>Tipo de negocio: {client.business_type}</p>
        </div>
      </section>
      <hr className="text-muted-foreground my-6" />
      <section className="flex flex-col gap-y-4 justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold">Detalles del abono</h3>
          <p className="text-muted-foreground">#{payment.id}</p>
          <div className="mt-6">
            <table className="w-full text-sm table-fixed">
              <tbody>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Fecha de abono: </td>
                  <td className="">{formatDateLong(payment.due_date)}</td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Estado: </td>
                  <td className="">{paymentStatusMap[payment.status]}</td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Abonado: </td>
                  <td className="">{formatPrice(payment.amount_paid)}</td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Restante: </td>
                  <td className="">{formatPrice(payment.amount_due)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Detalles del préstamo</h3>
          <p className="text-muted-foreground">
            #{payment.payment_plan.loan.id}
          </p>
          <div className="mt-6">
            <table className="text-sm w-full table-fixed">
              <tbody>
                <tr className="even:bg-slate-500 odd:bg-white">
                  <td className="font-bold">Fecha del crédito:</td>
                  <td className="">
                    {formatDateLong(payment.payment_plan.loan.loan_date)}
                  </td>
                  <td className="font-bold">Inicio:</td>
                  <td className="">
                    {formatDateLong(payment.payment_plan.loan.created_at)}
                  </td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Tipo:</td>
                  <td className="">
                    {frequencyMap[payment.payment_plan.frequency]}
                  </td>
                  <td className="font-bold">Última cuota:</td>
                  <td className="">{formatDateLong(payment.due_date)}</td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Monto:</td>
                  <td className="">
                    {formatPrice(payment.payment_plan.loan.amount)}
                  </td>
                  <td className="font-bold">Interés:</td>
                  <td className="">
                    {payment.payment_plan.loan.interest_rate}%
                  </td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Recuperación:</td>
                  <td className="">
                    {formatPrice(payment.payment_plan.loan.total_recovered)}
                  </td>
                  <td className="font-bold">Cuota:</td>
                  <td className="">
                    {formatPrice(payment.payment_plan.payment_amount)}
                  </td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Monto abonado:</td>
                  <td className="">
                    {formatPrice(
                      +payment.payment_plan.loan.total_recovered -
                        +payment.payment_plan.loan.total_pending,
                    )}
                  </td>
                  <td className="font-bold">Total Abonos:</td>
                  <td className="">{payment.payment_plan.total_payments}</td>
                </tr>
                <tr className="even:bg-slate-200 odd:bg-white">
                  <td className="font-bold">Monto pendiente:</td>
                  <td className="">
                    {formatPrice(payment.payment_plan.loan.total_pending)}
                  </td>
                  <td className="font-bold">Total Abonos pendientes:</td>
                  <td className="">
                    {payment.payment_plan.payments_remaining}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
