import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { type PaymentStatus } from '@/types/loans'
import { paymentStatusMap } from '@/utils/contants'

export function PaymentStatus({ status }: { status: PaymentStatus }) {
  return <StatusBadge status={status}>{paymentStatusMap[status]}</StatusBadge>
}

export function StatusBadge({
  status,
  children,
}: {
  status: PaymentStatus
  children: React.ReactNode
}) {
  return (
    <Badge
      className={cn('hover:bg-transparent text-sm', {
        'bg-green-100 text-green-800': status === 'paid',
        'bg-yellow-100 text-yellow-800': status === 'pending',
        'bg-red-100 text-red-800 animate-bounce': status === 'late',
      })}
    >
      {children}
    </Badge>
  )
}
