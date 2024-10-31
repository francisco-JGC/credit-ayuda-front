import { LoanFrequencyWithAll } from '@/pages/loan/hooks/use-loan-filters'
import { frequencies, frequencyMap } from '@/utils/contants'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface FilterFrequencyProps {
  onChangeFrequency: (frequency: LoanFrequencyWithAll) => void
}

export function FilterFrequency({ onChangeFrequency }: FilterFrequencyProps) {
  return (
    <Select
      defaultValue="all"
      onValueChange={(e) => onChangeFrequency(e as LoanFrequencyWithAll)}
    >
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Tipo de préstamos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            className="opacity-80"
            value="all"
            onClick={() => onChangeFrequency('all')}
          >
            Tipo de préstamo
          </SelectItem>
          {frequencies.map((frequency) => (
            <SelectItem
              key={frequency}
              value={frequency}
              onClick={() =>
                onChangeFrequency(frequency as LoanFrequencyWithAll)
              }
            >
              {frequencyMap[frequency]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
