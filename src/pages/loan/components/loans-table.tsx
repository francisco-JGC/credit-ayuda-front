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
import { formatDateLong } from '@/utils/date-format'
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
  const getLoanDebtAmount = (loan: ILoan) => {
    const totalPaid = loan.payment_plan.payment_schedules.reduce(
      (acc, payment) => {
        return acc + Number(payment.amount_paid)
      },
      0,
    )
    return +loan.total_recovered - totalPaid
  }

  return (
    <div className="border rounded-lg h-full overflow-x-auto">
      <Table className="table-auto min-w-[600px]">
        <TableHeader className="bg-gray-100">
          <TableRow className="[&>th]:px-4 [&>th]:text-xs">
            <TableHead className="">ID</TableHead>
            <TableHead className="">Cliente</TableHead>
            <TableHead className="">Cédula</TableHead>
            <TableHead className="">Fecha de préstamo</TableHead>
            <TableHead className="">Monto solicitado</TableHead>
            <TableHead className="">Interés</TableHead>
            <TableHead className="">Deuda Restante</TableHead>
            <TableHead className="">Tipo de Préstamo</TableHead>
            <TableHead className="">Ruta</TableHead>
            <TableHead className="">Estado</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.length === 0 && !isLoading && !error && (
            <TableRow>
              <TableCell
                colSpan={totalColumns}
                className="text-gray-600 text-center"
              >
                No se encontraron préstamos
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell
                colSpan={totalColumns}
                className="text-red-600 text-center"
              >
                Ocurrió un error al obtener los préstamos, por favor intenta de
                nuevo.
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
                <TableCell>{formatDateLong(loan.created_at)}</TableCell>
                <TableCell>{formatPrice(Number(loan.amount))}</TableCell>
                <TableCell>
                  {formatPrice(
                    Number(loan.amount) * (Number(loan.interest_rate) / 100),
                  )}
                </TableCell>
                <TableCell>{formatPrice(getLoanDebtAmount(loan))}</TableCell>
                <TableCell>
                  {formatFrequency(loan.payment_plan.frequency)}
                </TableCell>
                <TableCell>{loan.client.route?.name ?? '-'}</TableCell>
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
