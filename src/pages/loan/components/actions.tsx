import {
  BanknoteIcon,
  ClockArrowUp,
  EllipsisVertical,
  History,
  X,
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
import { ILoan } from '@/types/loans'
import { Link } from 'react-router-dom'
interface IProps {
  loan: ILoan
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
          <DropdownMenuItem asChild>
            <Link
              to={`/loans/details/${loan.id}`}
              className="flex gap-2 items-center w-full hover:cursor-pointer"
            >
              <BanknoteIcon className="h-4 w-4" />
              Detalles del Prestamo
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to={`/loans/payments/${loan.id}`}
              className="flex gap-2 items-center w-full hover:cursor-pointer"
            >
              <History className="h-4 w-4" />
              Abonos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to={'/loangs/ff'}
              className="flex gap-2 items-center w-full hover:cursor-pointer"
            >
              <ClockArrowUp className="h-4 w-4" />
              Generar mora
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
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
