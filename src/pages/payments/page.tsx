import { useParams } from 'react-router-dom'
import { AddNewPayment } from './components/add-payment'
import { ClientDetails } from './components/client-details'
import { LoanDetails } from './components/loan-details'
import { PaymentsTable } from './components/payments-table'
import { useLoanDetails } from './hook/use-loan-details'

export function PaymentsPage() {
  const { id } = useParams()
  const { loan } = useLoanDetails({ id: Number(id) })

  if (loan == null) {
    return null
  }

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-2xl font-medium">Abonos</h2>
          <p className="text-sm text-muted-foreground">Préstamo #{id}</p>
        </div>
        <div>
          <AddNewPayment loan={loan} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="">
          <ClientDetails loan={loan} />
        </div>
        <div className="col-span-2 row-span-2">
          <PaymentsTable loan={loan} />
        </div>
        <div className="">
          <LoanDetails loan={loan} />
        </div>
      </div>
    </div>
  )
}
