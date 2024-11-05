import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ILoan } from '@/types/loans'
import { toast } from 'sonner'
import { useUpdatePayment } from '../hook/use-update-payment'

interface AddNewPaymentProps {
  loan: ILoan
}

export function AddNewPayment({ loan }: AddNewPaymentProps) {
  const { update, isPending, error, isSuccess } = useUpdatePayment()

  const payment = [...loan.payment_plan.payment_schedules]
    .sort(
      (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
    )
    .find((payment) => payment.status === 'pending')

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

    if (amount > Number(payment?.amount_due ?? 0)) {
      toast.warning('El monto no puede ser mayor al monto pendiente')
      return
    }
    const updatedPayment = {
      ...payment,
      amount_paid: (Number(payment.amount_paid) + amount).toFixed(2),
    }
    update(updatedPayment)
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
            <Input
              max={payment?.amount_due}
              min={1}
              type="number"
              name="amount"
              id="amount"
            />
          </div>
          <div>
            <p></p>
          </div>
          <div className="flex justify-end mt-6">
            <Button type="submit">Agregar {isPending && 'Guardando'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
