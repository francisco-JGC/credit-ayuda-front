import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ILoan } from '@/types/loans'
import { formatDateLong } from '@/utils/date-format'
import { formatPrice } from '@/utils/price-format'

interface LoanDetailsProps {
  loan?: ILoan
  isLoading: boolean
}

export function LoanDetails({ loan, isLoading }: LoanDetailsProps) {
  const getRecover = (loan: ILoan) =>
    Number(loan.amount) * (Number(loan.interest_rate) / 100) +
    Number(loan.amount)

  return (
    <Card className="shadow-sm h-full rounded-sm">
      <CardHeader>
        <CardTitle>Detalles del préstamo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Creación del crédito:</p>
            {isLoading && <Skeleton className="h-4" />}
            {loan != null && !isLoading && (
              <p>{formatDateLong(loan.created_at)}</p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Inicio:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && (
              <p>{formatDateLong(loan.loan_date)}</p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Monto:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && (
              <p>{formatPrice(Number(loan.amount))}</p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Interés:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && <p>{loan.interest_rate}%</p>}
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Cuota:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && (
              <p>{formatPrice(Number(loan.payment_plan.payment_amount))}</p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Recuperación:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && (
              <p>{formatPrice(getRecover(loan))}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
