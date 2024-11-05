import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ILoan } from '@/types/loans'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useUpdatePayment } from '../hook/use-update-payment'
import { StatusBadge } from './payment-status'

interface AddNewPaymentProps {
  loan: ILoan
}

export function AddNewPayment({ loan }: AddNewPaymentProps) {
  const { update, isPending } = useUpdatePayment({ loanId: loan.id })
  const closeModalRef = useRef<HTMLButtonElement>(null)

  const payment = [...loan.payment_plan.payment_schedules]
    .sort(
      (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
    )
    .find(
      (payment) => payment.status === 'pending' || payment.status === 'late',
    )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    }

    const updatedPayment = {
      ...payment,
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar abono</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo abono</DialogTitle>
          <DialogDescription>Ingrese los datos del abono</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="amount">Monto:</Label>
            <Input type="number" name="amount" id="amount" />
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
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isPending}>
              Agregar {isPending && 'Guardando...'}
            </Button>
          </div>
        </form>
        <DialogClose ref={closeModalRef} className="hidden" />
      </DialogContent>
    </Dialog>
  )
}
