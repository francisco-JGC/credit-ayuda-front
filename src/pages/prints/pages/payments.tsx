import { usePaymentDetails } from '@/pages/payments/hook/use-payment-details'
import { frequencyMap } from '@/utils/contants'
import { formatDateLong } from '@/utils/date-format'
import { useParams } from 'react-router-dom'

export function PaymentsPrintPage() {
  const { paymentId } = useParams()
  const { isLoading, payment } = usePaymentDetails({
    id: Number(paymentId),
  })
  // useEffect(() => {
  //   window.print()
  // }, [])

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
        <div>{formatDateLong(paymentPlan.loan.created_at ?? '')}</div>
      </div>
      <section className="mt-2">
        <div className="flex flex-col">
          <p>Cédula: {client.dni}</p>
          <p>Teléfono: {client.primary_phone}</p>
          <p>Dirección: {client.primary_address}</p>
          <p>Tipo de negocio: {client.business_type}</p>
        </div>
      </section>
      <hr className="text-muted-foreground my-6" />
      <section>
        <h3 className="text-lg font-semibold">
          Préstamo #{payment.payment_plan.loan.id}
        </h3>
        <div className="mt-2  grid grid-cols-2">
          <p>
            <strong>Creación del crédito: </strong>
            {formatDateLong(payment.payment_plan.loan.created_at)}
          </p>
          <p>
            <strong>Inicio: </strong>
            {formatDateLong(payment.payment_plan.loan.loan_date)}
          </p>
          <p>
            <strong>Tipo: </strong>
            {frequencyMap[payment.payment_plan.frequency]}
          </p>
          <p>
            <strong>Última cuota: </strong>
            {formatDateLong(payment.due_date)}
          </p>
          <p>
            <strong>Monto: </strong>
            C${payment.payment_plan.loan.amount}
          </p>
          <p>
            <strong>Interés: </strong>
            {payment.payment_plan.loan.interest_rate}%
          </p>
          <p>
            <strong>Recuperación: </strong>
            C${payment.payment_plan.loan.total_recovered}
          </p>
          <p>
            <strong>Cuota: </strong>
            C${payment.payment_plan.payment_amount}
          </p>
        </div>
      </section>
    </div>
  )
}
