import {
  BanknoteIcon,
  ClockArrowUp,
  EllipsisVertical,
  History,
  X,
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
import { ILoanTable } from '@/types/loans'
interface IProps {
  loan: ILoanTable
}

export const Actions = ({ loan }: IProps) => {
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
            <BanknoteIcon className="mr-2 h-4 w-4" />
            <span>Detalles del Prestamo</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <History className="mr-2 h-4 w-4" />
            <span>Abonos</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ClockArrowUp className="mr-2 h-4 w-4" />
            <span>Generar Mora</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500'>
          <X className="mr-2 h-4 w-4" />
          <span>Cancelar Solicitud</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}