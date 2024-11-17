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
import { useNavigate } from 'react-router-dom'

interface ILoanTableProps {
  loans: ILoan[]
  isLoading: boolean
  error: Error | null
}

export function MyRouteLoanTable({
  loans,
  isLoading,
  error,
}: ILoanTableProps) {
  const totalColumns = 6

  const navigate = useNavigate()

  return (
    <div className="border rounded-lg h-full overflow-x-auto">
      <Table className="table-auto min-w-[600px]">
        <TableHeader className="bg-gray-100">
          <TableRow className="[&>th]:px-4 [&>th]:text-xs">
            <TableHead className="px-4 font-normal w-40">Cliente</TableHead>
            <TableHead className="px-4 font-normal w-40">Cédula</TableHead>
            <TableHead className="px-4 font-normal">Monto solicitado</TableHead>
            <TableHead className="px-4 font-normal">Interés</TableHead>
            <TableHead className="px-4 font-normal">Deuda Restante</TableHead>
            <TableHead className="px-4 font-normal">Tipo de Préstamo</TableHead>
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
              <TableRow className="[&>td]:px-4 text-sm  w-full cursor-pointer" key={loan.id}
                onClick={() => navigate(`/loans/payments/${loan.id}`)}
              >
                <TableCell>{loan.client.name}</TableCell>
                <TableCell>{loan.client.dni}</TableCell>
                <TableCell>{formatPrice(Number(loan.amount))}</TableCell>
                <TableCell>
                  {formatPrice(Number(loan.amount) * (Number(loan.interest_rate) / 100))}
                </TableCell>
                <TableCell>{formatPrice(Number(loan.total_pending))}</TableCell>
                <TableCell>{formatFrequency(loan.payment_plan.frequency)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div >
  )
}