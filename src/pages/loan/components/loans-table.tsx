import { SkeletonTableRows } from '@/components/skeleton-table-rows'
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
import { ILoan } from '@/types/loans'
import { formatFrequency } from '@/utils/format-frequency'
import { formatLoanStatus } from '@/utils/format-loanState'
import { formatPrice } from '@/utils/price-format'
import { Actions } from './actions'

interface ILoanTableProps {
  loans: ILoan[]
  isLoading: boolean
  error: Error | null
}

export function LoansTable({ loans, isLoading, error }: ILoanTableProps) {
  return (
    <Table className="w-full table-fixed">
      <TableCaption>Lista de préstamos</TableCaption>
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="font-semibold text-gray-800 py-4 px-6">
            Nombre del cliente
          </TableHead>
          <TableHead className="font-semibold text-gray-800 py-4 px-6">
            Cédula
          </TableHead>
          <TableHead className="font-semibold text-gray-800 py-4 px-6">
            Fecha de préstamo
          </TableHead>
          <TableHead className="font-semibold text-gray-800 py-4 px-6">
            Monto solicitado
          </TableHead>
          <TableHead className="font-semibold text-gray-800 py-4 px-6">
            Deuda Restante
          </TableHead>
          <TableHead className="font-semibold text-gray-800 py-4 px-6">
            Tipo de Prestamo
          </TableHead>
          <TableHead className="font-semibold text-gray-800 py-4 px-6">
            Ruta
          </TableHead>
          <TableHead className="font-semibold text-gray-800 py-4 px-6">
            Estado
          </TableHead>
          <TableHead className="font-semibold text-gray-800 py-4 px-6"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.length === 0 && !isLoading && !error && (
          <TableRow>
            <TableCell
              colSpan={8}
              className="py-4 px-6 text-gray-600 text-center"
            >
              No se encontraron préstamos
            </TableCell>
          </TableRow>
        )}
        {error && (
          <TableRow>
            <TableCell
              colSpan={8}
              className="py-4 px-6 text-red-600 text-center"
            >
              Ocurrió un error al obtener los préstamos, por favor intenta de
              nuevo.
            </TableCell>
          </TableRow>
        )}
        {isLoading && <SkeletonTableRows columns={8} rows={5} />}
        {!isLoading &&
          loans.map((loan) => (
            <TableRow key={loan.id} className="border-b">
              <TableCell className="py-4 px-6 font-semibold">
                {loan.client.name}
              </TableCell>
              <TableCell className="py-4 px-6">{loan.client.dni}</TableCell>
              <TableCell className="py-4 px-6">
                {new Date(loan.created_at).toDateString()}
              </TableCell>
              <TableCell className="py-4 px-6">
                {formatPrice(Number(loan.amount))}
              </TableCell>
              <TableCell className="py-4 px-6">
                {formatPrice(Number(loan.total_pending))}
              </TableCell>
              <TableCell className="py-4 px-6">
                {formatFrequency(loan.payment_plan.frequency)}
              </TableCell>
              <TableCell className="py-4 px-6">
                {loan.client.route?.name ?? ''}
              </TableCell>
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
