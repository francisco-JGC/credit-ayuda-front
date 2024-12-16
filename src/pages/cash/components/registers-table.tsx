import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Register } from '@/types/registers'
import { registerTypeMap } from '@/utils/contants'
import { formatDateLong } from '@/utils/date-format'
import { formatPrice } from '@/utils/price-format'

interface RegistersTableProps {
  registers: Register[]
}

export function RegistersTable({ registers }: RegistersTableProps) {
  return (
    <div className="border rounded-lg h-full overflow-x-auto">
      <Table className="table-auto min-w-[600px]">
        <TableHeader className="bg-gray-100">
          <TableRow className="[&>th]:px-4 [&>th]:text-xs">
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Detalles</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Caja chica</TableHead>
            <TableHead>Ahorro</TableHead>
            <TableHead>Retiro</TableHead>
            <TableHead>Usuario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registers.map((register) => (
            <TableRow key={register.id} className="[&>td]:px-4 [&>td]:py-4">
              <TableCell>{formatDateLong(register.created_at)}</TableCell>
              <TableCell>{registerTypeMap[register.type]}</TableCell>
              <TableCell>{register.details}</TableCell>
              <TableCell>{formatPrice(+register.amount)}</TableCell>
              <TableCell>{formatPrice(+(register.cash ?? 0))}</TableCell>
              <TableCell>{formatPrice(+(register.savings ?? 0))}</TableCell>
              <TableCell>{formatPrice(+(register.withdraw ?? 0))}</TableCell>
              <TableCell>{register.user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
