import { Link, useParams } from 'react-router-dom'
import { AddNewPayment } from './components/add-payment'
import { ClientDetails } from './components/client-details'
import { LoanDetails } from './components/loan-details'
import { PaymentsTable } from './components/payments-table'
import { useLoanDetails } from './hook/use-loan-details'
import { useState } from 'react'
import { IPaymentSchedule } from '@/types/loans'
import { Button } from '@/components/ui/button'
import { PrinterIcon } from 'lucide-react'

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
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex w-full justify-between">
          <div>
            <h2 className="text-2xl font-medium">Abonos</h2>
            <p className="text-sm text-muted-foreground">Préstamo #{id}</p>
          </div>
          <div>
            <Button asChild>
              <Link to={`/prints/loans/${loan?.id}`}>
                <div className="flex gap-2 justify-between items-center">
                  Imprimir detalles{' '}
                  <PrinterIcon strokeWidth={1} className="size-6" />
                </div>
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
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
      <div className="grid grid-cols-1 gap-y-4 mt-4 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <ClientDetails loan={loan} isLoading={isLoading} />
        </div>
        <div className="sm:col-span-2 lg:col-span-2">
          <PaymentsTable
            loan={loan}
            isLoading={isLoading}
            onAddPayment={handleShowNewPaymentModal}
          />
        </div>
        <div>
          <LoanDetails loan={loan} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
