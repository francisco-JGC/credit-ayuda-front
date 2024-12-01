import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function LoanStatusBadge({ status }: { status: string }) {
  const statusColor: Record<string, string> = {
    paid: 'text-green-500 hover:bg-green-500 shadow-none hover:text-white',
    pending: 'text-yellow-500 hover:bg-yellow-500 shadow-none hover:text-white',
    active: 'text-blue-500 hover:bg-blue-500 shadow-none hover:text-white',
    rejected: 'text-red-500 hover:bg-red-500 shadow-none hover:text-white',
  }

  const statusText: Record<string, string> = {
    paid: 'Pagado',
    pending: 'Pendiente',
    active: 'Activo',
    rejected: 'Rechazado',
  }

  return (
    <Badge
      className={cn(
        `px-2 py-1 text-xs font-semibold bg-transparent text-white ${statusColor[status]}`,
      )}
    >
      {statusText[status]}
    </Badge>
  )
}
