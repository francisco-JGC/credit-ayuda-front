import { LoanFrequencyWithAll } from '@/hooks/use-loan-filters'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { frequencies, frequencyMap } from '@/utils/contants'

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
          <SelectLabel>Frequencias</SelectLabel>
          <SelectItem value="all" onClick={() => onChangeFrequency('all')}>
            Todas las frequencias
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
