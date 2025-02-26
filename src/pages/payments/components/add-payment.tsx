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
import { useUpdateLoan } from '@/pages/requests/hooks/use-update-loan'
import { ILoan, IPaymentSchedule } from '@/types/loans'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useUpdatePayment } from '../hook/use-update-payment'
import { StatusBadge } from './payment-status'
import {
  useCreateRegister,
  useRegisters,
} from '@/pages/cash/hooks/use-registers'
import { useUserInfo } from '@/pages/profile/hooks/use-user-info'
import { Checkbox } from '@/components/ui/checkbox'

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
  const [useRest, setUseRest] = useState(false)
  const { registers } = useRegisters()
  const { create } = useCreateRegister()
  const { userInfo } = useUserInfo()
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
    const mostRecentRegister = registers[0]
    if (mostRecentRegister == null) {
      toast.warning('No hay registros de caja')
      return
    }

    if (useRest && amount > +(loan.total_pending ?? 0)) {
      toast.warning('El monto no puede ser mayor al monto pendiente')
      return
    }

    if (amount <= 0) {
      toast.warning('El monto debe ser mayor a 0')
      return
    }

    if (!useRest && amount > Number(payment.amount_due ?? 0)) {
      toast.warning('El monto no puede ser mayor al monto pendiente')
      return
    }

    if (userInfo == null) {
      toast.error('No se pudo obtener la información del usuario')
      return
    }
    let restAmount = 0
    const makeRestPayment = async (
      amountToPay: number,
      payment: IPaymentSchedule,
    ) => {
      const originalAmount = amountToPay
      let status = payment.status
      if (amountToPay >= Number(payment.amount_due)) {
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
      if (amountToPay > Number(payment.amount_due)) {
        restAmount = amountToPay - Number(payment.amount_due)
        amountToPay = Number(payment.amount_due)
      } else {
        restAmount = 0
      }

      await update({
        ...payment,
        paid_date: new Date().toISOString(),
        amount_paid: (Number(payment.amount_paid) + amountToPay).toFixed(2),
        amount_due: (Number(payment.amount_due) - amountToPay).toFixed(2),
        status,
      })

      const sortedPayments = [...loan.payment_plan.payment_schedules].sort(
        (a, b) =>
          new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
      )

      let nextPaymentIndex = -1

      for (const [index, sortedPayment] of sortedPayments.entries()) {
        if (payment.id === sortedPayment.id) {
          nextPaymentIndex = index + 1
          break
        }
      }

      if (nextPaymentIndex === -1) {
        return amountToPay
      }

      const nextPayment = sortedPayments[nextPaymentIndex]

      if (restAmount > 0) {
        await makeRestPayment(restAmount, nextPayment)
      }
      return originalAmount
    }

    const { id, created_at, ...rest } = mostRecentRegister
    const newCash = Number(mostRecentRegister.cash ?? 0) + amount

    try {
      const amountPaid = await makeRestPayment(amount, payment)
      await create({
        ...rest,
        amount: amountPaid.toFixed(2),
        type: 'income',
        withdraw: '0',
        cash: newCash.toFixed(2),
        user: userInfo,
        details: `Abono a préstamo #${loan.id}`,
      })
      toast.success('Abono guardado correctamente')
    } catch (error) {
      toast.error('Ocurrió un error al registrar el movimiento')
    }
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
          <div className="mt-2 flex items-center space-x-2">
            <Checkbox
              name="use-rest"
              id="use-rest"
              checked={useRest}
              onCheckedChange={(checked: boolean) => setUseRest(checked)}
            />
            <Label htmlFor="use-rest">
              Usar restante para los siguientes abonos.
            </Label>
          </div>
          <div className="mt-4">
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
