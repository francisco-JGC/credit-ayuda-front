import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

interface SkeletonTableRowsProps {
  rows?: number
  columns: number
}

export function SkeletonTableRows({
  rows = 5,
  columns,
}: SkeletonTableRowsProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="border-b">
          <TableCell colSpan={columns} className="py-4 px-6">
            <Skeleton
              className="h-7"
              style={{ width: `${((rows - i) * 100) / rows}%` }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
