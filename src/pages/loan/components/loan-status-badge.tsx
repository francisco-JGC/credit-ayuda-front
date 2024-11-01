import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function LoanStatusBadge({ status }: { status: string }) {
  const statusColor: Record<string, string> = {
    paid: 'text-green-500 border border-green-500 hover:bg-green-500 hover:text-white',
    pending:
      'text-yellow-500 border border-yellow-400 hover:bg-yellow-500 hover:text-white',
    active:
      'text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white',
  }

  const statusText: Record<string, string> = {
    paid: 'Pagado',
    pending: 'Pendiente',
    active: 'Activo',
  }

  return (
    <Badge
      className={cn(
        `px-2 py-1 rounded-full text-xs font-semibold bg-transparent text-white ${statusColor[status]}`,
      )}
    >
      {statusText[status]}
    </Badge>
  )
}
