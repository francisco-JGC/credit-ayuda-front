import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { formatFrequency } from "@/utils/format-frequency"

interface IProps {
  handleSetFrequency: (route: string) => void
}


export function FrequencyPayment({ handleSetFrequency }: IProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [frequencies] = useState<string[]>(['daily', 'weekly', 'biweekly', 'monthly', 'yearly'])

  useEffect(() => {
    handleSetFrequency(value)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? formatFrequency(frequencies.find((frequency) => frequency === value) || '' as any)
            : "Frecuencia de pago..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          {/* <CommandInput placeholder="Buscar tipo de plan..." /> */}
          <CommandList>
            <CommandEmpty>Tipo de prestamo no encontrado</CommandEmpty>
            <CommandGroup>
              {frequencies.map((frequency) => (
                <CommandItem
                  key={frequency}
                  value={frequency}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === frequency ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {formatFrequency(frequency as any)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
