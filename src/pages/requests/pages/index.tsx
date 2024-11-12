import { LoansTable } from '@/pages/loan/components/loans-table'
import { RequestsActions } from '../components/requests-actions'
import { useRequests } from '../hooks/use-requests'

export function RequestsPage() {
  const { requests, error, isLoading } = useRequests()

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
          renderActions={(request) => <RequestsActions request={request} />}
        />
      </div>
    </div>
  )
}
