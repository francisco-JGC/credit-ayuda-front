import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ILoan, IPaymentSchedule } from '@/types/loans'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useUpdatePayment } from '../hook/use-update-payment'
import { StatusBadge } from './payment-status'
import { useUpdateLoan } from '@/pages/requests/hooks/use-update-loan'

interface AddNewPaymentProps {
  loan: ILoan
  payment: IPaymentSchedule | null
  opened: boolean
  onOpenChange: (open: boolean) => void
}

export function AddNewPayment({
  loan,
  payment,
  opened,
  onOpenChange,
}: AddNewPaymentProps) {
  const { update, isPending } = useUpdatePayment({ loanId: loan.id })
  const { update: updateLoan } = useUpdateLoan()
  const closeModalRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (payment == null) {
      toast.warning('No hay pagos pendientes')
      return
    }

    const formData = new FormData(event.currentTarget)
    const amount = Number(formData.get('amount'))
    if (amount <= 0) {
      toast.warning('El monto debe ser mayor a 0')
      return
    }

    if (amount > Number(payment.amount_due ?? 0)) {
      toast.warning('El monto no puede ser mayor al monto pendiente')
      return
    }

    let status = payment.status
    if (amount === Number(payment.amount_due)) {
      status = 'paid'
      const tempPayments = loan.payment_plan.payment_schedules.map((p) => {
        if (p.id === payment.id) {
          return {
            ...p,
            status: 'paid',
          }
        }
        return p
      })

      const hasBeenPaid = tempPayments.every((p) => p.status === 'paid')
      if (hasBeenPaid) {
        await updateLoan({
          ...loan,
          status: 'paid',
        })
      }
    }

    const updatedPayment: IPaymentSchedule = {
      ...payment,
      paid_date: new Date().toISOString(),
      amount_paid: (Number(payment.amount_paid) + amount).toFixed(2),
      amount_due: (Number(payment.amount_due) - amount).toFixed(2),
      status,
    }
    update(updatedPayment)
      .then(() => {
        toast.success('Abono guardado correctamente')
      })
      .catch(() => {
        toast.error('Ocurrió un error al guardar el abono')
      })
      .finally(() => {
        closeModalRef.current?.click()
      })
  }

  const handleNoPayment = () => {
    if (payment == null || payment?.status === 'late') {
      return
    }

    update({
      ...payment,
      status: 'late',
    })
      .then(() => {
        toast.success('Se actualizó el estado del pago correctamente')
      })
      .catch(() => {
        toast.error('Ocurrió al actualizar el estado del pago')
      })
      .finally(() => {
        closeModalRef.current?.click()
      })
  }

  return (
    <Dialog open={opened} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo abono</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="amount">Monto:</Label>
            <Input type="number" step={0.01} name="amount" id="amount" />
          </div>

          <div className="mt-2">
            <div className="text-sm">
              <p>
                El monto se agregará al pago con la fecha{' '}
                {new Date(payment?.due_date ?? '').toLocaleDateString()}.
              </p>
            </div>
            <div className="text-sm">
              Monto pendiente:{' '}
              <StatusBadge status="pending">
                C${Number(payment?.amount_due).toFixed(2)}
              </StatusBadge>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="place-self-end">
              <Button
                type="button"
                onClick={() => handleNoPayment()}
                variant="destructive"
              >
                No pagó
              </Button>
            </div>
            <Button type="submit" disabled={isPending}>
              Guardar monto {isPending && 'Guardando...'}
            </Button>
          </div>
        </form>
        <DialogClose ref={closeModalRef} className="hidden" />
      </DialogContent>
    </Dialog>
  )
}
