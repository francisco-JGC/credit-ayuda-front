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
        'bg-inherit shadow-none text-green-700': status === 'paid',
        'bg-inherit shadow-none text-yellow-700': status === 'pending',
        'bg-inherit shadow-none text-red-700 animate-bounce': status === 'late',
      })}
    >
      {children}
    </Badge>
  )
}
