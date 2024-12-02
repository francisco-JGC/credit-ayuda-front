import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatDateLong } from '@/utils/date-format'
import { useAddPenaltyPayment } from '../hooks/use-penalty'
import { toast } from 'sonner'
import { IPenaltyPlan } from '@/types/loans'
import { useState } from 'react'

export function AddPenaltyPayment({
  penaltyPlan,
}: {
  penaltyPlan: IPenaltyPlan
}) {
  const [open, setOpen] = useState(false)
  const { addPayment, isPending } = useAddPenaltyPayment({ id: penaltyPlan.id })
  const today = new Date().toISOString()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const amount = +(form.get('amount') ?? 0)
    if (amount <= 0 || amount > penaltyPlan.current_penalty_amount) {
      toast.error('El monto es incorrecto')
      return
    }

    addPayment({
      amount_due: amount,
      amount_paid: amount,
      dueDate: today,
      status: 'paid',
    })
      .then(() => {
        toast.success('Pago de mora añadido correctamente')
      })
      .catch(() => {
        toast.error('Ocurrió un error al añadir el pago de mora')
      })
      .finally(() => {
        setOpen(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Añadir pago</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir pago de mora</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>
              Monto
              <Input type="number" placeholder="0" min={0} name="amount" />
            </Label>
          </div>
          <div className="my-2">
            <p className="text-sm text-muted-foreground">
              El monto será añadido con la fecha:{' '}
              <strong>{formatDateLong(today)}</strong>.
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Guardando pago...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
