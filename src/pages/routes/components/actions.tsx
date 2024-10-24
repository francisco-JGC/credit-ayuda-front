import {
  EllipsisVertical,
  PenIcon,
  TrashIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IRoute } from "@/types/routes"
import { Link } from "react-router-dom"
import { AlertDialogModal } from "@/components/alertDialogModal"

interface IProps {
  route: IRoute
  onDeleteRouute: (id: number) => void
}

export const Actions = ({ route, onDeleteRouute }: IProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical width={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PenIcon className="mr-2 h-4 w-4" />
            <Link to={`/routes/update/${route.id}`}>Modificar Ruta</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />

        <AlertDialogModal
          title="Estas seguro de eliminar esta ruta?"
          subtitle="Si eliminas esta ruta, los usuarios relacionados quedaran sin ruta hasta volver asignarles una."
          onConfirm={() => onDeleteRouute(route.id)}
        >
          <div className="text-red-400 text-sm flex items-center rounded-sm px-2 py-1.5">
            <TrashIcon className="mr-2 h-4 w-4" />
            <span>Eliminar Ruta</span>
          </div>
        </AlertDialogModal>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}