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
import { useState } from "react";
import { FilterRoute } from "@/components/filterTables/filterRoute";

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

export default function ClientPage() {
  const { formValues: search, handleInputChange } = useForm({
    search_dni: ''
  })
  const [routeFilter, setRouteFilter] = useState<string>('')

  const handleSetRouteFilter = (route: string) => setRouteFilter(route)

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link to={'/clients/create'}>
          <Button className="w-full md:w-auto">Nuevo cliente</Button>
        </Link>

        <div className="flex flex-col md:flex-row justify-between gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[350px]">
            <Search className="text-gray-500 absolute top-2 left-2" width={19} />
            <Input
              placeholder="Cédula del cliente..."
              className="pl-10 w-full"
              name="search_dni"
              onChange={handleInputChange}
              value={search.search_dni}
            />
          </div>

          <div className="mt-2 md:mt-0">
            <FilterRoute handleSetRouteFilter={handleSetRouteFilter} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <Table className="w-full">
          <TableCaption>Lista de clientes</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Nombre del Cliente</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Teléfono</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Dirección</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Deuda Actual</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Ruta</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Estado de préstamo</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((client) => (
              <TableRow key={client.id} className="border-b">
                <TableCell className="py-4 px-6 font-semibold">{client.name}</TableCell>
                <TableCell className="py-4 px-6">{client.phone}</TableCell>
                <TableCell className="py-4 px-6">{client.address}</TableCell>
                <TableCell className="py-4 px-6">{formatPrice(client.currentDebt)}</TableCell>
                <TableCell className="py-4 px-6">{client.route}</TableCell>
                <TableCell
                  className={`py-4 px-6 font-bold ${client.loanStatus === 'approved'
                    ? 'text-green-500'
                    : client.loanStatus === 'pending'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                    }`}
                >
                  {client.loanStatus === 'approved'
                    ? 'Aprobado'
                    : client.loanStatus === 'pending'
                      ? 'Pendiente'
                      : 'Pagado'}
                </TableCell>
                <TableCell className="py-4 px-6">
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
        </Table>
      </div>
    </div>
  );
}
