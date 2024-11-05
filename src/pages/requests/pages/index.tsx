import { LoansTable } from '@/pages/loan/components/loans-table'
import { useLoans } from '@/pages/loan/hooks/use-loans'

export function RequestsPage() {
  const { loans, error, isLoading } = useLoans()
  const requests = loans.filter((loan) => loan.status === 'pending')

  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-medium">Solicitudes</h1>
        <p className="text-sm text-muted-foreground">10 solicitudes.</p>
      </div>
      <div className="mt-4">
        <LoansTable
          error={error}
          isLoading={isLoading}
          loans={requests}
          renderActions={() => <></>}
        />
      </div>
    </div>
  )
}
