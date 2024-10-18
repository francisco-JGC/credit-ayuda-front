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
import { ILoanTable } from "@/types/loans";
import { Actions } from "./components/actions";
import { formatPrice } from "@/utils/price-format";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useForm from "@/hooks/useForm";
import { FilterRoute } from "@/components/filterRoute";
import { useState } from "react";
import { formatFrequency } from "@/utils/format-frequency";
import { FilterFrequency } from "@/components/filterFrequency";

const items: ILoanTable[] = [
  {
    id: 1,
    client_name: 'Juan Pérez',
    dni: '12345678',
    amount: 5000,
    remaining_debt: 100.50,
    frequency: 'monthly',
    route: 'Ruta 1',
    status: 'active'
  },
  {
    id: 2,
    client_name: 'María Gómez',
    dni: '87654321',
    amount: 10000,
    remaining_debt: 3250.80,
    frequency: 'weekly',
    route: 'Ruta 2',
    status: 'active'
  },
  {
    id: 3,
    client_name: 'Carlos Sánchez',
    dni: '11223344',
    amount: 2000,
    remaining_debt: 0.00,
    frequency: 'daily',
    route: 'Ruta 3',
    status: 'paid'
  },
];



export default function LoanPage() {
  const { formValues: search, handleInputChange } = useForm({
    search_dni: ''
  })
  const [routeFilter, setRouteFilter] = useState<string>('')
  const [frequencyFilter, setFrequencyFilter] = useState<string>('')

  const handleSetRouteFilter = (route: string) => setRouteFilter(route)
  const handleSetFrequency = (route: string) => setRouteFilter(route)

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link to={'/loans/create'}>
          <Button className="w-full md:w-auto">Nuevo Prestamo</Button>
        </Link>

        <div className="flex flex-col md:flex-row justify-between gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[350px]">
            <Search className="text-gray-500 absolute top-2 left-2" width={19} />
            <Input
              placeholder="Cédula del loane..."
              className="pl-10 w-full"
              name="search_dni"
              onChange={handleInputChange}
              value={search.search_dni}
            />
          </div>

          <div className="mt-2 md:mt-0 flex gap-2">
            <FilterFrequency handleSetFrequency={handleSetFrequency} />
            <FilterRoute handleSetRouteFilter={handleSetRouteFilter} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <Table className="w-full">
          <TableCaption>Lista de loanes</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Nombre del loane</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Cédula</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Monto desembolado</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Deuda Restante</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Tipo de Prestamo</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Ruta</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((loan) => (
              <TableRow key={loan.id} className="border-b">
                <TableCell className="py-4 px-6 font-semibold">{loan.client_name}</TableCell>
                <TableCell className="py-4 px-6">{loan.dni}</TableCell>
                <TableCell className="py-4 px-6">{formatPrice(loan.amount)}</TableCell>
                <TableCell className="py-4 px-6">{formatPrice(loan.remaining_debt)}</TableCell>
                <TableCell className="py-4 px-6">{formatFrequency(loan.frequency)}</TableCell>
                <TableCell className="py-4 px-6">{loan.route}</TableCell>

                <TableCell className="py-4 px-6">
                  <Actions loan={loan} />
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
