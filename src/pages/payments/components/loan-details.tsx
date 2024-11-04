import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ILoan } from '@/types/loans'

export function LoanDetails({ loan }: { loan: ILoan }) {
  const recover =
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
            <p>{new Date(loan.created_at ?? '').toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Inicio:</p>
            <p>{new Date(loan.loan_date ?? '').toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Monto:</p>
            <p>C${loan.amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Interés:</p>
            <p>{loan.interest_rate}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Cuota:</p>
            <p>C${loan.payment_plan.payment_amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Recuperación:</p>
            <p>C${recover}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
