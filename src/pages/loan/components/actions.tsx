import {
  BanknoteIcon,
  ClockArrowUp,
  EllipsisVertical,
  History,
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
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
interface IProps {
  loan: ILoan
}

export const Actions = ({ loan }: IProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
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
              to={`/loans/edit/${loan.id}`}
              className="flex gap-2 items-center w-full hover:cursor-pointer"
            >
              <Pencil1Icon className="h-4 w-4" />
              Editar Prestamo
            </Link>
          </DropdownMenuItem>
          {loan.status !== 'rejected' && loan.penalty_plan == null && (
            <DropdownMenuItem asChild>
              <Link
                to={`/loans/payments/${loan.id}`}
                className="flex gap-2 items-center w-full hover:cursor-pointer"
              >
                <History className="h-4 w-4" />
                Abonos
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            {loan.status !== 'rejected' &&
              loan.status !== 'paid' &&
              loan.penalty_plan == null && (
                <Link
                  to={`/arrears/create/${loan.id}`}
                  className="flex gap-2 items-center w-full hover:cursor-pointer"
                >
                  <ClockArrowUp className="h-4 w-4" />
                  Generar mora
                </Link>
              )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {loan.status !== 'rejected' &&
              loan.status !== 'paid' &&
              loan.penalty_plan != null && (
                <Link
                  to={`/arrears/${loan.id}`}
                  className="flex gap-2 items-center w-full hover:cursor-pointer"
                >
                  <ClockArrowUp className="h-4 w-4" />
                  Abonos de mora
                </Link>
              )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
