import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { IRoute } from "@/types/routes"
import { getAllRoutes } from "@/services/route"

interface IProps {
  handleSetRouteFilter: (route: string) => void
}


export function FilterRoute({ handleSetRouteFilter }: IProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [routes, setRoutes] = useState<IRoute[]>([])

  useEffect(() => {
    handleSetRouteFilter(value)
  }, [value])

  useEffect(() => {
    getAllRoutes()
      .then((response) => {
        if (response.success) {
          setRoutes(response.data as any)
        }
      })
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-[200px] justify-between"
        >
          {value
            ? routes.find((route) => route.name === value)?.name
            : "Seleccione una ruta..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full
       p-0">
        <Command>
          <CommandInput placeholder="Buscar ruta..." />
          <CommandList>
            <CommandEmpty>Ruta no encontrada</CommandEmpty>
            <CommandGroup>
              {routes.map((route) => (
                <CommandItem
                  key={route.name}
                  value={route.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === route.name ? "opacity-100" : "opacity-0"
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
