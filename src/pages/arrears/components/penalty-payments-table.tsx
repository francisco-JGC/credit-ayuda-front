import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IPenaltyPaymentSchedule } from '@/types/loans'
import { penaltyStatusMap } from '@/utils/contants'
import { formatDateLong } from '@/utils/date-format'
import { formatPrice } from '@/utils/price-format'

interface PenaltyPaymentsTableProps {
  penaltyPayments: IPenaltyPaymentSchedule[]
}

export function PenaltyPaymentsTable({
  penaltyPayments,
}: PenaltyPaymentsTableProps) {
  return (
    <div className="overflow-y-auto">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow className="[&>th]:px-2 lg:[&>th]:px-4 [&>th]:text-xs">
            <TableHead>ID</TableHead>
            <TableHead>Fecha de pago</TableHead>
            <TableHead>Monto pagado</TableHead>
            <TableHead>Monto restante</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {penaltyPayments.map((penaltyPayment) => (
            <TableRow
              key={penaltyPayment.id}
              className="[&>td]:px-2 lg:[&>td]:px-4"
            >
              <TableCell>#{penaltyPayment.id}</TableCell>
              <TableCell>{formatDateLong(penaltyPayment.dueDate)}</TableCell>
              <TableCell>{formatPrice(penaltyPayment.amount_paid)}</TableCell>
              <TableCell>{formatPrice(penaltyPayment.amount_due)}</TableCell>
              <TableCell>{penaltyStatusMap[penaltyPayment.status]}</TableCell>
            </TableRow>
          ))}

          {penaltyPayments.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No hay pagos de mora
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
