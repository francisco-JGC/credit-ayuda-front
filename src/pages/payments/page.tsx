import { useParams } from 'react-router-dom'
import { ClientDetails } from './components/client-details'
import { LoanDetails } from './components/loan-details'
import { useLoanDetails } from './hook/use-loan-details'
import { PaymentsTable } from './components/payments-table'
import { Button } from '@/components/ui/button'

export function PaymentsPage() {
  const { id } = useParams()
  const { loan, isLoading } = useLoanDetails({ id: Number(id) })
  return (
    <div className="">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-2xl font-medium">Abonos</h2>
          <p className="text-sm text-muted-foreground">Préstamo #{id}</p>
        </div>
        <div>
          <Button>Agregar abono</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="">
          <ClientDetails loan={loan} isLoading={isLoading} />
        </div>
        <div className="col-span-2 row-span-2">
          <PaymentsTable loan={loan} isLoading={isLoading} />
        </div>
        <div className="">
          <LoanDetails loan={loan} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
