import { useParams } from 'react-router-dom'
import { AddNewPayment } from './components/add-payment'
import { ClientDetails } from './components/client-details'
import { LoanDetails } from './components/loan-details'
import { PaymentsTable } from './components/payments-table'
import { useLoanDetails } from './hook/use-loan-details'
import { useState } from 'react'
import { IPaymentSchedule } from '@/types/loans'

export function PaymentsPage() {
  const { id } = useParams()
  const { loan, isLoading } = useLoanDetails({ id: Number(id) })
  const [payment, setPayment] = useState<IPaymentSchedule | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleShowNewPaymentModal = (payment: IPaymentSchedule) => {
    setPayment(payment)
    setModalOpen(true)
  }

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-2xl font-medium">Abonos</h2>
          <p className="text-sm text-muted-foreground">Préstamo #{id}</p>
        </div>
        <div>
          {loan != null && !isLoading && (
            <AddNewPayment
              loanId={loan.id}
              opened={modalOpen}
              payment={payment}
              onOpenChange={setModalOpen}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="">
          <ClientDetails loan={loan} isLoading={isLoading} />
        </div>
        <div className="col-span-2 row-span-2">
          <PaymentsTable
            loan={loan}
            isLoading={isLoading}
            onAddPayment={handleShowNewPaymentModal}
          />
        </div>
        <div className="">
          <LoanDetails loan={loan} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
