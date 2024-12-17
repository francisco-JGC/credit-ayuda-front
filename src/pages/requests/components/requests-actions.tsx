import { Button } from '@/components/ui/button'
import { ILoan } from '@/types/loans'
import { BanknoteIcon, CircleCheck, EllipsisVertical, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { useUpdateLoan } from '../hooks/use-update-loan'
import { toast } from 'sonner'
import {
  useCreateRegister,
  useRegisters,
} from '@/pages/cash/hooks/use-registers'
import { useUserInfo } from '@/pages/profile/hooks/use-user-info'

interface RequestsActionsProps {
  request: ILoan
}

export function RequestsActions({ request }: RequestsActionsProps) {
  const { update } = useUpdateLoan()
  const { create } = useCreateRegister()
  const { registers } = useRegisters()
  const { userInfo } = useUserInfo()

  const handleAcceptRequest = async () => {
    const mostRecentRegister = registers[0]
    if (mostRecentRegister == null) {
      toast.error('No se puede aceptar la solicitud, no hay registros de caja')
      return
    }
    if (userInfo == null) {
      toast.error(
        'No se puede aceptar la solicitud, no se pudo obtener la información del usuario',
      )
      return
    }

    const newCash = +(mostRecentRegister.cash ?? 0) - +request.amount
    if (newCash < 0) {
      toast.error(
        'No hay suficiente efectivo en caja para aceptar la solicitud',
      )
      return
    }

    const { id, created_at, ...rest } = mostRecentRegister ?? {}

    create({
      ...rest,
      type: 'loan',
      amount: request.amount,
      details: `Préstamo #${request.id} a ${request.client.name}`,
      withdraw: '0',
      cash: newCash.toFixed(2),
      user: userInfo,
    })
      .then(() => {
        update({
          ...request,
          status: 'active',
        })
          .then(() => {
            toast.success('Solicitud aceptada correctamente')
          })
          .catch(() => {
            toast.error('Ocurrió un error al aceptar la solicitud')
          })
      })
      .catch(() => {
        toast.error('Ocurrió un error registrar el movimiento en caja')
      })
  }

  const handleRejectRequest = async () => {
    update({
      ...request,
      status: 'rejected',
    })
      .then(() => {
        toast.success('Solicitud rechazada correctamente')
      })
      .catch(() => {
        toast.error('Ocurrió un error al rechazar la solicitud')
      })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical width={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              to={`/loans/details/${request.id}`}
              className="flex gap-2 items-center w-full hover:cursor-pointer"
            >
              <BanknoteIcon className="h-4 w-4" />
              Detalles de la solicitud
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            onClick={handleAcceptRequest}
            variant="ghost"
            className="justify-start gap-2 w-full hover:cursor-pointer"
          >
            <CircleCheck className="h-4 w-4" />
            <span>Aceptar solicitud</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            onClick={handleRejectRequest}
            className="w-full gap-2 justify-start text-red-500 hover:!text-red-500 hover:cursor-pointer"
            variant="ghost"
          >
            <X className="h-4 w-4" />
            <span>Cancelar solicitud</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
