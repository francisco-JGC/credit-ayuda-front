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
import { LoanStatusBadge } from './loan-status-badge'

interface ILoanTableProps {
  loans: ILoan[]
  isLoading: boolean
  error: Error | null
  renderActions: (loan: ILoan) => JSX.Element
}

export function LoansTable({
  loans,
  isLoading,
  error,
  renderActions,
}: ILoanTableProps) {
  const totalColumns = 11

  return (
    <div className="border rounded-lg h-full overflow-x-auto">
      <Table className="table-auto min-w-[600px]">
        <TableHeader className="bg-gray-100">
          <TableRow className="[&>th]:px-4 [&>th]:text-xs">
            <TableHead className="px-4 font-normal w-10">ID</TableHead>
            <TableHead className="px-4 font-normal w-40">Cliente</TableHead>
            <TableHead className="px-4 font-normal w-40">Cédula</TableHead>
            <TableHead className="px-4 font-normal">Fecha de préstamo</TableHead>
            <TableHead className="px-4 font-normal">Monto solicitado</TableHead>
            <TableHead className="px-4 font-normal">Interés</TableHead>
            <TableHead className="px-4 font-normal">Deuda Restante</TableHead>
            <TableHead className="px-4 font-normal">Tipo de Préstamo</TableHead>
            <TableHead className="px-4 font-normal">Ruta</TableHead>
            <TableHead className="px-4 font-normal">Estado</TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.length === 0 && !isLoading && !error && (
            <TableRow>
              <TableCell colSpan={totalColumns} className="text-gray-600 text-center">
                No se encontraron préstamos
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell colSpan={totalColumns} className="text-red-600 text-center">
                Ocurrió un error al obtener los préstamos, por favor intenta de nuevo.
              </TableCell>
            </TableRow>
          )}
          {isLoading && <SkeletonTableRows columns={totalColumns} rows={10} />}
          {!isLoading &&
            loans.map((loan) => (
              <TableRow key={loan.id} className="[&>td]:px-4 text-sm">
                <TableCell className="font-semibold">#{loan.id}</TableCell>
                <TableCell>{loan.client.name}</TableCell>
                <TableCell>{loan.client.dni}</TableCell>
                <TableCell>
                  {new Date(loan.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{formatPrice(Number(loan.amount))}</TableCell>
                <TableCell>
                  {formatPrice(Number(loan.amount) * (Number(loan.interest_rate) / 100))}
                </TableCell>
                <TableCell>{formatPrice(Number(loan.total_pending))}</TableCell>
                <TableCell>{formatFrequency(loan.payment_plan.frequency)}</TableCell>
                <TableCell>{loan.client.route?.name ?? ''}</TableCell>
                <TableCell>
                  <LoanStatusBadge status={loan.status} />
                </TableCell>
                <TableCell>{renderActions(loan)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
