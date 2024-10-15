import { Client } from '@/types/clients'
import {
  EllipsisVertical,
  HistoryIcon,
  PenIcon,
  Plus,
  TrashIcon,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
interface IProps {
  client: Client
}

export const Actions = ({ client }: IProps) => {
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
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Detalles</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HistoryIcon className="mr-2 h-4 w-4" />
            <span>Historial Crediticio</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PenIcon className="mr-2 h-4 w-4" />
            <span>Editar Cliente</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={`${client.loanStatus !== 'paid' ? 'opacity-40' : ''}`}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Nuevo Prestamo</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500'>
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>Eliminar Cliente</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}