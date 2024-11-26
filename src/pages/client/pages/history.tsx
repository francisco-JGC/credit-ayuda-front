import { Link, useParams } from 'react-router-dom'
import { useClient } from '../hooks/use-client'
import { LoansTable } from '@/pages/loan/components/loans-table'
import { useLoansByClient } from '@/pages/loan/hooks/use-loans'
import { Button } from '@/components/ui/button'
import { ClientLoansActions } from '../components/client-loans-actions'

export function ClientHistoryPage() {
  const { id } = useParams()
  const { client } = useClient({ id: Number(id) })
  const { error, loans, isLoading } = useLoansByClient({ clientId: Number(id) })

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-4">
          <h1 className="text-2xl font-medium">{client?.name}</h1>
          <p className="text-muted-foreground text-sm">Historial crediticio</p>
        </div>
        <div>
          <Button asChild>
            <Link to={`/clients/update/${id}`}>Detalles del cliente</Link>
          </Button>
        </div>
      </div>

      <LoansTable
        error={error}
        isLoading={isLoading}
        loans={loans ?? []}
        renderActions={(loan) => <ClientLoansActions loanId={loan.id} />}
      />
    </div>
  )
}
