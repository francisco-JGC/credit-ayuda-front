import { IClientTable } from '@/types/clients'
import {
  EllipsisVertical,
  HistoryIcon,
  PenIcon,
  Plus,
  TrashIcon,
  User,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { useDeleteClient } from '../hooks/use-client'
import { toast } from 'sonner'
interface IProps {
  client: IClientTable
}

export const Actions = ({ client }: IProps) => {
  const { deleteClient, isLoading } = useDeleteClient()

  const handleDeleteClient = (id: number) => {
    deleteClient(id)
      .then(() => {
        toast.success('Cliente eliminado correctamente')
      })
      .catch(() => {
        toast.error('Ocurrio un error al eliminar el cliente')
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
            <Link to={`/clients/history/${client.id}`}>
              <HistoryIcon className="mr-2 h-4 w-4" />
              <span>Historial Crediticio</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PenIcon className="mr-2 h-4 w-4" />
            <Link to={`/clients/update/${client.id}`}>Modificar Cliente</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`${client.loan_status !== 'paid' ? 'opacity-40' : ''}`}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>Nuevo Prestamo</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDeleteClient(client.id)}
          className="text-red-500"
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>{isLoading ? 'Eliminando...' : 'Eliminar Cliente'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
