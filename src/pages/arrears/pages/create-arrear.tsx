import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoanDetails } from '@/pages/payments/hook/use-loan-details'
import { formatDateLong } from '@/utils/date-format'
import { formatPrice } from '@/utils/price-format'
import { useParams } from 'react-router-dom'

export function CreateArrearPage() {
  const { loanId } = useParams()
  const { loan } = useLoanDetails({ id: Number(loanId) })

  const totalPaid =
    loan?.payment_plan.payment_schedules.reduce(
      (acc, schedule) => acc + Number(schedule.amount_paid),
      0,
    ) ?? 0
  const pendingDebt = (loan?.total_recovered ?? 0) - totalPaid
  const lastPaymentDate = loan?.payment_plan.payment_schedules
    .filter((schedule) => schedule.paid_date != null)
    .sort(
      (a, b) =>
        new Date(b.paid_date!).getTime() - new Date(a.paid_date!).getTime(),
    )[0]?.paid_date

  return (
    <div>
      <div>
        <h2 className="text-2xl font-medium">Nueva mora</h2>
        <p className="text-sm text-muted-foreground">Préstamo #{loanId}.</p>
      </div>
      <Card className="shadow-sm h-full rounded-sm mt-4">
        <CardContent className="p-6">
          <section>
            <div className="grid grid-cols-4 gap-8 w-full">
              <p className="inline-flex flex-col">
                <span className="text-sm text-muted-foreground">Cliente: </span>
                <span className="font-medium">{loan?.client.name}</span>
              </p>
              <p className="inline-flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Monto pendiente:{' '}
                </span>
                <span className="font-medium">{formatPrice(pendingDebt)}</span>
              </p>
              <p className="inline-flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Fecha del préstamo:{' '}
                </span>
                <span className="font-medium">
                  {loan != null && formatDateLong(loan.created_at)}
                </span>
              </p>
              <p className="inline-flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Fecha último pago realizado:{' '}
                </span>
                <span className="font-medium">
                  {lastPaymentDate != null
                    ? formatDateLong(lastPaymentDate)
                    : '-'}
                </span>
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
      <Card className="mt-4 h-full shadow-sm rounded-sm">
        <CardHeader>
          <CardTitle>Detalles de la mora</CardTitle>
          <CardDescription>
            Por favor llene los siguientes campos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <Label htmlFor="amount" className="block mb-2">
                  Monto a pagar
                </Label>
                <Input
                  disabled
                  value={pendingDebt}
                  type="number"
                  id="amount"
                  name="amount"
                  className="input"
                  placeholder="Monto a pagar"
                />
              </div>
              <div>
                <Label htmlFor="interest_rate" className="block mb-2">
                  Interés por mora
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    max={100}
                    min={0}
                    id="interest_rate"
                    name="interest"
                    className="input"
                    placeholder="10"
                  />
                  %
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-medium">Detalles del primer pago</h3>
              <p className="text-muted-foreground">
                Por favor llene los siguientes campos.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <Label className="mb-2 block">Fecha de pago</Label>
                <Input type="date" name="payment_date" />
              </div>
              <div>
                <Label className="mb-2 block">Monto a pagar</Label>
                <Input type="number" name="payment_amount" />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit">Crear mora</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
