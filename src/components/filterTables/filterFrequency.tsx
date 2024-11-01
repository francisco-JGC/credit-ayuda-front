import { LoanFrequency } from '@/pages/loan/hooks/use-loan-filters'
import { frequencies, frequencyMap } from '@/utils/contants'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useState } from 'react'

interface FilterFrequencyProps {
  onChangeFrequency: (frequency: LoanFrequency | undefined) => void
}

export function FilterFrequency({ onChangeFrequency }: FilterFrequencyProps) {
  const [value, setValue] = useState<LoanFrequency | ''>('')

  const handleOnValueChange = (newFrequency: string) => {
    if (newFrequency === 'default') {
      setValue('')
      onChangeFrequency(undefined)
      return
    }
    setValue(newFrequency as LoanFrequency)
    onChangeFrequency(newFrequency as LoanFrequency)
  }

  return (
    <Select
      value={value}
      defaultValue="default"
      onValueChange={handleOnValueChange}
    >
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Tipo de préstamos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className="opacity-80" value="default">
            Todos
          </SelectItem>
          {frequencies.map((frequency) => (
            <SelectItem key={frequency} value={frequency}>
              {frequencyMap[frequency]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
