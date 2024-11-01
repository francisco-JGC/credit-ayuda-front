import { SkeletonTableRows } from '@/components/skeleton-table-rows'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ILoan } from '@/types/loans'
import { formatFrequency } from '@/utils/format-frequency'
import { formatPrice } from '@/utils/price-format'
import { Actions } from './actions'
import { LoanStatusBadge } from './loan-status-badge'

interface ILoanTableProps {
  loans: ILoan[]
  isLoading: boolean
  error: Error | null
}

export function LoansTable({ loans, isLoading, error }: ILoanTableProps) {
  return (
    <div className="border rounded-lg h-full">
      <Table className="table-fixed">
        <TableHeader className="bg-gray-100">
          <TableRow className="[&>th]:px-4 [&>th]:text-xs">
            <TableHead className="px-4 font-normal">Cliente</TableHead>
            <TableHead className="px-4 font-normal">Cédula</TableHead>
            <TableHead className="px-4 font-normal">
              Fecha de préstamo
            </TableHead>
            <TableHead className="px-4 font-normal">Monto solicitado</TableHead>
            <TableHead className="px-4 font-normal">Deuda Restante</TableHead>
            <TableHead className="px-4 font-normal">Tipo de Prestamo</TableHead>
            <TableHead className="px-4 font-normal">Ruta</TableHead>
            <TableHead className="px-4 font-normal">Estado</TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.length === 0 && !isLoading && !error && (
            <TableRow>
              <TableCell colSpan={9} className="text-gray-600 text-center">
                No se encontraron préstamos
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell colSpan={9} className="text-red-600 text-center">
                Ocurrió un error al obtener los préstamos, por favor intenta de
                nuevo.
              </TableCell>
            </TableRow>
          )}
          {isLoading && <SkeletonTableRows columns={9} rows={10} />}
          {!isLoading &&
            loans.map((loan) => (
              <TableRow key={loan.id} className="[&>td]:px-4">
                <TableCell className="">{loan.client.name}</TableCell>
                <TableCell className="">{loan.client.dni}</TableCell>
                <TableCell className="">
                  {new Date(loan.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="">
                  {formatPrice(Number(loan.amount))}
                </TableCell>
                <TableCell className="">
                  {formatPrice(Number(loan.total_pending))}
                </TableCell>
                <TableCell className="">
                  {formatFrequency(loan.payment_plan.frequency)}
                </TableCell>
                <TableCell className="">
                  {loan.client.route?.name ?? ''}
                </TableCell>
                <TableCell>
                  <LoanStatusBadge status={loan.status} />
                </TableCell>
                <TableCell>
                  <Actions loan={loan} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
