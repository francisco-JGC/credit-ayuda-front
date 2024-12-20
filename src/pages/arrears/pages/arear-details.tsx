import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { penaltyStatusMap } from '@/utils/contants'
import { formatDateLong } from '@/utils/date-format'
import { formatPrice } from '@/utils/price-format'
import { useNavigate, useParams } from 'react-router-dom'
import { AddPenaltyPayment } from '../components/add-penalty-payment'
import { PenaltyPaymentsTable } from '../components/penalty-payments-table'
import { usePenalty } from '../hooks/use-penalty'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export function ArrearDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { penaltyPlan } = usePenalty({ id: Number(id) })

  const totalPaid =
    penaltyPlan?.penalty_payment_schedules.reduce(
      (acc, schedule) => acc + Number(schedule.amount_paid),
      0,
    ) ?? 0

  const paymentsDone = penaltyPlan?.penalty_payment_schedules.filter(
    (schedule) => schedule.status === 'paid',
  ).length

  const navigate = useNavigate()
  const handleClickNavigate = () => navigate(-1)

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <div className="lg:flex items-center gap-2">
          <div>
            <Button className="p-2 md:p-3" onClick={handleClickNavigate}>
              <ChevronLeft width={18} />
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-medium">Mora #{id}</h2>
            <p className="text-sm text-muted-foreground">
              Préstamo #{penaltyPlan?.loan.id}.
            </p>
          </div>
        </div>
        <div>
          {penaltyPlan != null && (
            <AddPenaltyPayment penaltyPlan={penaltyPlan} />
          )}
        </div>
      </div>
      <Card className="h-full shadow-sm mt-4 rounded-sm">
        <CardHeader>
          <CardTitle>Detalles de la mora</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-x-2 gap-y-6">
            <p className="inline-flex flex-col">
              <span className="text-sm text-muted-foreground">Cliente: </span>
              <span className="font-medium">
                {penaltyPlan?.loan?.client.name}{' '}
                <span className="text-sm text-muted-foreground">
                  ({penaltyPlan?.loan?.client.dni})
                </span>
              </span>
            </p>
            <p className="inline-flex flex-col">
              <span className="text-sm text-muted-foreground">
                Fecha de creación:{' '}
              </span>
              <span className="font-medium">
                {penaltyPlan?.created_at != null &&
                  formatDateLong(penaltyPlan?.created_at)}
              </span>
            </p>
            <p className="inline-flex flex-col">
              <span className="text-sm text-muted-foreground">Estado:</span>
              <span className="font-medium">
                {penaltyPlan?.status != null &&
                  penaltyStatusMap[penaltyPlan?.status]}
              </span>
            </p>
            <p className="inline-flex flex-col">
              <span className="text-sm text-muted-foreground">
                Monto total de la mora:
              </span>
              <span className="font-medium">
                {formatPrice(penaltyPlan?.total_penalty_amount ?? 0)}
              </span>
            </p>
            <p className="inline-flex flex-col">
              <span className="text-sm text-muted-foreground">
                Monto pendiente:
              </span>
              <span className="font-medium">
                {formatPrice(penaltyPlan?.current_penalty_amount ?? 0)}
              </span>
            </p>
            <p className="inline-flex flex-col">
              <span className="text-sm text-muted-foreground">
                Interés por mora:
              </span>
              <span className="font-medium">
                {penaltyPlan?.interest_rate ?? 0}%
              </span>
            </p>
            <p className="inline-flex flex-col">
              <span className="text-sm text-muted-foreground">
                Total pagado:
              </span>
              <span className="font-medium">{formatPrice(totalPaid)}</span>
            </p>
            <p className="inline-flex flex-col">
              <span className="text-sm text-muted-foreground">
                Pagos realizados:
              </span>
              <span className="font-medium">{paymentsDone}</span>
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full shadow-sm mt-4 rounded-sm">
        <CardHeader>
          <CardTitle>Pagos de la mora</CardTitle>
        </CardHeader>
        <CardContent>
          <PenaltyPaymentsTable
            penaltyPayments={penaltyPlan?.penalty_payment_schedules ?? []}
          />
        </CardContent>
      </Card>
    </div>
  )
}
