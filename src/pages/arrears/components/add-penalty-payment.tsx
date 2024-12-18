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
import {
  useCreateRegister,
  useRegisters,
} from '@/pages/cash/hooks/use-registers'
import { useUserInfo } from '@/pages/profile/hooks/use-user-info'

export function AddPenaltyPayment({
  penaltyPlan,
}: {
  penaltyPlan: IPenaltyPlan
}) {
  const [open, setOpen] = useState(false)
  const { create } = useCreateRegister()
  const { registers } = useRegisters()
  const { userInfo } = useUserInfo()
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

    const mostRecentRegister = registers[0]
    if (mostRecentRegister == null) {
      toast.error('No hay registros de caja')
      return
    }

    if (userInfo == null) {
      toast.error('No se pudo obtener la información del usuario')
      return
    }

    const { id, created_at, ...rest } = mostRecentRegister
    const newCash = Number(mostRecentRegister.cash ?? 0) + amount
    create({
      ...rest,
      amount: amount.toFixed(2),
      type: 'income',
      user: userInfo,
      cash: newCash.toFixed(2),
      details: `Abono a mora #${penaltyPlan.id}`,
      withdraw: '0',
    })
      .then(() => {
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
      })
      .catch(() => {
        toast.error('Ocurrió un error al registrar el movimiento')
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
