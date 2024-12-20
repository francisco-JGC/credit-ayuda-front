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
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useCreatePenalty } from '../hooks/use-penalty'

export function CreateArrearPage() {
  const { loanId } = useParams()
  const { loan } = useLoanDetails({ id: Number(loanId) })
  const [interestRate, setInterestRate] = useState<number | undefined>()
  const { createPlan } = useCreatePenalty()

  const totalPaid =
    loan?.payment_plan.payment_schedules.reduce(
      (acc, schedule) => acc + Number(schedule.amount_paid),
      0,
    ) ?? 0
  const pendingDebt = +(loan?.total_recovered ?? 0) - totalPaid
  const newPendingDebt =
    (+(loan?.total_recovered ?? 0) - totalPaid) *
    ((interestRate ?? 0) / 100 + 1)

  const lastPaymentDate = loan?.payment_plan.payment_schedules
    .filter((schedule) => schedule.paid_date != null)
    .sort(
      (a, b) =>
        new Date(b.paid_date!).getTime() - new Date(a.paid_date!).getTime(),
    )[0]?.paid_date

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (interestRate == null || loan == null) {
      toast.error('Por favor ingrese el interés por mora.')
      return
    }

    createPlan({
      interest_rate: interestRate,
      total_penalty_amount: newPendingDebt,
      status: 'pending',
      penalty_payment_schedules: [],
      loan: loan,
      current_penalty_amount: newPendingDebt,
    })
      .then(() => {
        toast.success('Mora creada exitosamente.')
        navigate(`/arrears/${loanId}`)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  const navigate = useNavigate()
  const handleClickNavigate = () => navigate(-1)

  return (
    <div className="container mx-auto p-4">
      <div className="lg:flex lg:items-center gap-2">
        <div>
          <Button className="p-2 md:p-3" onClick={handleClickNavigate}>
            <ChevronLeft width={18} />
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-medium">Nueva mora</h2>
          <p className="text-sm text-muted-foreground">Préstamo #{loanId}.</p>
        </div>
      </div>
      <Card className="shadow-sm h-full rounded-sm mt-4">
        <CardContent className="p-6">
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <Label htmlFor="amount" className="block mb-2">
                  Monto a pagar
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">C$</span>
                  <Input
                    disabled
                    value={newPendingDebt}
                    type="number"
                    id="amount"
                    name="amount"
                    className=""
                    placeholder="Monto a pagar"
                  />
                </div>
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
                    value={interestRate}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setInterestRate(undefined)
                        return
                      }
                      setInterestRate(Number(e.target.value))
                    }}
                    id="interest_rate"
                    name="interest"
                    className="input"
                    placeholder="10"
                  />
                  %
                </div>
              </div>
            </div>
            {/* <div className="mt-8">
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
            */}
            <div className="mt-8 flex justify-end">
              <Button type="submit">Crear mora</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
