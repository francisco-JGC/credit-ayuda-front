import { SkeletonTableRows } from '@/components/skeleton-table-rows'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/utils/price-format'

interface ICredit {
  loan_id: number
  route_name: string
  collected: number
  pending_collected: number
  paid_installments: number
  pending_installments: number
}

interface ICreditTableProps {
  isLoading: boolean
  data: ICredit[]
  error: Error | null
}

export function CreditTable({
  isLoading,
  data,
  error
}: ICreditTableProps) {
  const totalColumns = 6


  return (
    <div className="border rounded-lg h-full overflow-x-auto">
      <Table className="table-auto min-w-[600px]">
        <TableHeader className="bg-gray-100">
          <TableRow className="[&>th]:px-4 [&>th]:text-xs">
            <TableHead className="px-4 font-normal w-40">Nombre de la ruta</TableHead>
            <TableHead className="px-4 font-normal w-40">Monto Cobrado</TableHead>
            <TableHead className="px-4 font-normal">Monto Pendiente</TableHead>
            <TableHead className="px-4 font-normal">Total de abonos</TableHead>
            <TableHead className="px-4 font-normal">Total de abonos pendientes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length === 0 && !isLoading && (
            <TableRow>
              <TableCell colSpan={totalColumns} className="text-gray-600 text-center">
                No se encontraron abonos por rutas
              </TableCell>
            </TableRow>
          )}
          {isLoading && <SkeletonTableRows columns={totalColumns} rows={10} />}
          {error && (
            <TableRow>
              <TableCell colSpan={totalColumns} className="text-red-600 text-center">
                Ocurrió un error al obtener la tabla de abonos, por favor intenta de nuevo.
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            data?.map((item) => (
              <TableRow className="[&>td]:px-4 text-sm  w-full cursor-pointer" key={item.loan_id}>
                <TableCell>{item.route_name}</TableCell>
                <TableCell>{formatPrice(item.collected)}</TableCell>
                <TableCell>{formatPrice(item.pending_collected)}</TableCell>
                <TableCell>{item.paid_installments}</TableCell>
                <TableCell>{item.pending_installments}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div >
  )
}
