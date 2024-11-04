import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ILoan } from '@/types/loans'

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
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Creación del crédito:</p>
            {isLoading && <Skeleton className="h-4" />}
            {loan != null && !isLoading && (
              <p>{new Date(loan.created_at ?? '').toLocaleDateString()}</p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Inicio:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && (
              <p>{new Date(loan.loan_date ?? '').toLocaleDateString()}</p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Monto:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && <p>C${loan.amount}</p>}
          </div>
          <div>
            <p className="text-muted-foreground">Interés:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && <p>{loan.interest_rate}%</p>}
          </div>
          <div>
            <p className="text-muted-foreground">Cuota:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && (
              <p>C${loan.payment_plan.payment_amount}</p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Recuperación:</p>
            {isLoading && <Skeleton className="h-4" />}

            {loan != null && !isLoading && <p>C${getRecover(loan)}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
