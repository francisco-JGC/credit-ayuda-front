import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ILoanTable } from '@/types/loans'
import { formatFrequency } from '@/utils/format-frequency'
import { formatLoanStatus } from '@/utils/format-loanState'
import { formatPrice } from '@/utils/price-format'
import { Actions } from './actions'

export function LoansTable({ loans }: { loans: ILoanTable[] }) {
  return (
    <Table className="w-full">
      <TableCaption>Lista de préstamos</TableCaption>
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="text-gray-800 font-bold py-4 px-6">
            Nombre del cliente
          </TableHead>
          <TableHead className="text-gray-800 font-bold py-4 px-6">
            Cédula
          </TableHead>
          <TableHead className="text-gray-800 font-bold py-4 px-6">
            Monto solicitado
          </TableHead>
          <TableHead className="text-gray-800 font-bold py-4 px-6">
            Deuda Restante
          </TableHead>
          <TableHead className="text-gray-800 font-bold py-4 px-6">
            Tipo de Prestamo
          </TableHead>
          <TableHead className="text-gray-800 font-bold py-4 px-6">
            Ruta
          </TableHead>
          <TableHead className="text-gray-800 font-bold py-4 px-6">
            Estado
          </TableHead>
          <TableHead className="text-gray-800 font-bold py-4 px-6"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => (
          <TableRow key={loan.id} className="border-b">
            <TableCell className="py-4 px-6 font-semibold">
              {loan.client_name}
            </TableCell>
            <TableCell className="py-4 px-6">{loan.dni}</TableCell>
            <TableCell className="py-4 px-6">
              {formatPrice(Number(loan.amount))}
            </TableCell>
            <TableCell className="py-4 px-6">
              {formatPrice(Number(loan.remaining_debt))}
            </TableCell>
            <TableCell className="py-4 px-6">
              {formatFrequency(loan.frequency)}
            </TableCell>
            <TableCell className="py-4 px-6">{loan.route}</TableCell>
            <TableCell
              className={`py-4 px-6 font-bold ${
                loan.status === 'paid'
                  ? 'text-green-600'
                  : loan.status === 'pending'
                  ? 'text-gray-600'
                  : loan.status === 'active'
                  ? 'text-blue-600'
                  : 'text-gray-900'
              }`}
            >
              {formatLoanStatus(loan.status)}
            </TableCell>

            <TableCell className="py-4 px-6">
              <Actions loan={loan} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* Puedes agregar un resumen aquí si lo necesitas */}
        </TableRow>
      </TableFooter>
    </Table>
  )
}
