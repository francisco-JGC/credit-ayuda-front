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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useUserInfo } from '@/pages/profile/hooks/use-user-info'
import { CreateRegister } from '@/types/registers'
import {
  RegisterTypeView,
  registerTypeView,
  registerTypeViewMap,
} from '@/utils/contants'
import { toast } from 'sonner'
import { useCreateRegister } from '../hooks/use-registers'

export function CreateRegisterModal({
  mostRecentRegister,
}: {
  mostRecentRegister?: CreateRegister
}) {
  const { create } = useCreateRegister()
  const { userInfo } = useUserInfo()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const type = formData.get('type') as RegisterTypeView
    const amount = Number(formData.get('amount')?.toString())
    const details = formData.get('details')?.toString()

    if (userInfo == null) {
      return
    }

    let register: CreateRegister | null = null
    if (type === 'savings') {
      if (
        mostRecentRegister != null &&
        +(mostRecentRegister.cash ?? 0) < amount
      ) {
        toast.error('No hay suficiente dinero en caja')
        return
      }

      const cash = +(mostRecentRegister?.cash ?? amount) - amount
      const savings = +(mostRecentRegister?.savings ?? 0) + amount

      register = {
        ...mostRecentRegister,
        type: 'savings',
        amount: amount.toFixed(2),
        details,
        user: userInfo,
        cash: cash.toFixed(2),
        savings: savings.toFixed(2),
      }
    }

    if (type === 'cash') {
      const cash = +(mostRecentRegister?.cash ?? 0) + amount

      register = {
        ...mostRecentRegister,
        type: 'cash',
        amount: amount.toFixed(2),
        details,
        user: userInfo,
        cash: cash.toFixed(2),
      }
    }

    if (type === 'withdraw') {
      const withdraw = amount
      const savings = +(mostRecentRegister?.savings ?? 0) - amount

      if (savings < 0) {
        toast.error('No hay suficiente dinero en ahorros')
        return
      }

      register = {
        ...mostRecentRegister,
        type: 'withdraw',
        amount: amount.toFixed(2),
        details,
        user: userInfo,
        withdraw: withdraw.toFixed(2),
        savings: savings.toFixed(2),
      }
    }

    if (register == null) {
      return
    }

    create(register)
      .then(() => {
        toast.success('Movimiento registrado')
      })
      .catch(() => {
        toast.error('No se pudo registrar el movimiento')
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nuevo movimiento</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registro de nuevo movimiento</DialogTitle>
        </DialogHeader>
        <form className="grid gap-y-4" onSubmit={handleSubmit}>
          <div>
            <Label>Movimiento</Label>
            <Select name="type">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de movimiento" />
              </SelectTrigger>
              <SelectContent>
                {registerTypeView.map((type) => (
                  <SelectItem key={type} value={type}>
                    {registerTypeViewMap[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Cantidad</Label>
            <Input
              type="number"
              step={0.01}
              name="amount"
              placeholder="000000"
            />
          </div>
          <div>
            <Label>Detalles</Label>
            <Textarea
              name="details"
              placeholder="Detalles del movimiento"
            ></Textarea>
          </div>
          <div className="flex justify-end mt-2">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
