import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useLoanRoutes } from '@/hooks/use-loan-routes'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'

interface IProps {
  onChangeRoute: (route: string) => void
}

export function FilterRoute({ onChangeRoute }: IProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { data: routes = [], isLoading } = useLoanRoutes()

  const handleSelectRoute = (currentValue: string) => {
    const newValue = currentValue === value ? '' : currentValue
    setValue(newValue)
    onChangeRoute(newValue)
    setOpen(false)
  }

  if (isLoading) {
    return <Skeleton className="min-w-[200px] h-full" />
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-[200px] font-normal justify-between"
        >
          {value || 'Filtrar por ruta'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full
       p-0"
      >
        <Command>
          <CommandInput placeholder="Buscar ruta..." />
          <CommandList>
            <CommandEmpty>Ruta no encontrada</CommandEmpty>
            <CommandGroup>
              {routes.map((route) => (
                <CommandItem
                  key={route.name}
                  value={route.name}
                  onSelect={handleSelectRoute}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 invisible',
                      value === route.name && 'visible',
                    )}
                  />
                  {route.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
