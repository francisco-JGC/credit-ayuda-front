import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IClientTable } from "@/types/clients";
import { Actions } from "./components/actions";
import { formatPrice } from "@/utils/price-format";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useForm from "@/hooks/useForm";
import { Select } from "@headlessui/react";
import { FilterRoute } from "./components/filterRoute";
import { useState } from "react";

const items: IClientTable[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    phone: '555-1234',
    address: 'Calle Falsa 123',
    currentDebt: 100.50,
    route: 'Ruta 1',
    loanStatus: 'approved',
  },
  {
    id: 2,
    name: 'María Gómez',
    phone: '555-5678',
    address: 'Av. Siempre Viva 742',
    currentDebt: 3250.80,
    route: 'Ruta 2',
    loanStatus: 'pending',
  },
  {
    id: 3,
    name: 'Carlos Sánchez',
    phone: '555-9876',
    address: 'Calle Luna 45',
    currentDebt: 0.00,
    route: 'Ruta 3',
    loanStatus: 'paid',
  },
  {
    id: 1,
    name: 'Juan Pérez',
    phone: '555-1234',
    address: 'Calle Falsa 123',
    currentDebt: 100.50,
    route: 'Ruta 1',
    loanStatus: 'approved',
  },
  {
    id: 2,
    name: 'María Gómez',
    phone: '555-5678',
    address: 'Av. Siempre Viva 742',
    currentDebt: 3250.80,
    route: 'Ruta 2',
    loanStatus: 'pending',
  },
  {
    id: 3,
    name: 'Carlos Sánchez',
    phone: '555-9876',
    address: 'Calle Luna 45',
    currentDebt: 0.00,
    route: 'Ruta 3',
    loanStatus: 'paid',
  },
  {
    id: 1,
    name: 'Juan Pérez',
    phone: '555-1234',
    address: 'Calle Falsa 123',
    currentDebt: 100.50,
    route: 'Ruta 1',
    loanStatus: 'approved',
  },
  {
    id: 2,
    name: 'María Gómez',
    phone: '555-5678',
    address: 'Av. Siempre Viva 742',
    currentDebt: 3250.80,
    route: 'Ruta 2',
    loanStatus: 'pending',
  },
  {
    id: 3,
    name: 'Carlos Sánchez',
    phone: '555-9876',
    address: 'Calle Luna 45',
    currentDebt: 0.00,
    route: 'Ruta 3',
    loanStatus: 'paid',
  },
];

const routes = [
  {
    value: "Ruta 1",
    label: "Ruta 1",
  },
  {
    value: "Ruta 2",
    label: "Ruta 2",
  },
  {
    value: "Ruta 3",
    label: "Ruta 3",
  },
  {
    value: "Ruta 4",
    label: "Ruta 4",
  },
]


export default function ClientPage() {
  const { formValues: search, handleInputChange } = useForm({
    search_dni: ''
  })
  const [routeFilter, setRouteFilter] = useState<string>('')

  const handleSetRouteFilter = (route: string) => setRouteFilter(route)



  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link to={'/clients/create'}>
          <Button>Nuevo cliente</Button>
        </Link>

        <div className="flex justify-between gap-4">
          <div className="relative">
            <Search className="text-gray-500 absolute top-[6px] left-2" width={19} />
            <Input placeholder="Cédula del cliente..." className="pl-10 w-[350px]"
              name="search_dni"
              onChange={handleInputChange}
              value={search.search_dni}
            />
          </div>

          <div>
            <FilterRoute handleSetRouteFilter={handleSetRouteFilter} routes={routes} />
          </div>
        </div>
      </div>
      <Table className="overflow-ellipsis">
        <TableCaption>Lista de clientes</TableCaption>
        <TableHeader className="bg-gray-100">
          < TableRow >
            <TableHead className="text-gray-800 font-bold">Nombre del Cliente</TableHead>
            <TableHead className="text-gray-800 font-bold">Teléfono</TableHead>
            <TableHead className="text-gray-800 font-bold">Dirección</TableHead>
            <TableHead className="text-gray-800 font-bold">Deuda Actual</TableHead>
            <TableHead className="text-gray-800 font-bold">Ruta</TableHead>
            <TableHead className="text-gray-800 font-bold">Estado de préstamo</TableHead>
            <TableHead></TableHead>
          </TableRow >
        </TableHeader >
        <TableBody>
          {items.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-semibold">{client.name}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell>{formatPrice(client.currentDebt)}</TableCell>
              <TableCell>{client.route}</TableCell>
              <TableCell className={`font-bold ${client.loanStatus === 'approved' ? 'text-green-500' : client.loanStatus === 'pending' ? 'text-yellow-500' : 'text-blue-500'}`}>
                {
                  client.loanStatus === 'approved' ? 'Aprobado' : client.loanStatus === 'pending' ? 'Pendiente' : 'Pagado'
                }
              </TableCell>
              <TableCell>
                <Actions client={client} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* Puedes agregar un resumen aquí si lo necesitas */}
          </TableRow>
        </TableFooter>
      </Table >
    </div>
  );
}
