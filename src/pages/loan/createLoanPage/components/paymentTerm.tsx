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
import { getPaymentTermByFrequency } from "@/utils/paymet-term"

interface IProps {
  handleSetFrequency: (route: string) => void
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'
}


export function PaymentTerm({ handleSetFrequency, frequency }: IProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [paymentTerm] = useState<{ value: number, label: string }[]>(getPaymentTermByFrequency(frequency))

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
            ? paymentTerm.find((frequency) => frequency.value.toString() === value)?.label
            : "Plazo..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          {/* <CommandInput placeholder="Buscar tipo de plan..." /> */}
          <CommandList>
            <CommandEmpty>Plazo no encontrado</CommandEmpty>
            <CommandGroup>
              {paymentTerm.map((frequency) => (
                <CommandItem
                  key={frequency.value}
                  value={frequency.value.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === frequency.value.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {frequency.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
