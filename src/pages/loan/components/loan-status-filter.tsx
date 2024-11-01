import { loanStatus, statusMap } from '@/utils/contants'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LoanStatus } from '@/types/loans'
import { useState } from 'react'

interface StatusFilterProps {
  onChangeStatus: (status: LoanStatus | undefined) => void
}

export function LoanStatusFilter({ onChangeStatus }: StatusFilterProps) {
  const [value, setValue] = useState<LoanStatus | ''>('')

  const handleValueChange = (newValue: string) => {
    if (newValue === 'default') {
      setValue('')
      onChangeStatus(undefined)
      return
    }
    setValue(newValue as LoanStatus)
    onChangeStatus(newValue as LoanStatus)
  }

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Estado del préstamos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className="opacity-80" value="default">
            Todos
          </SelectItem>
          {loanStatus.map((status) => (
            <SelectItem key={status} value={status}>
              {statusMap[status]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
