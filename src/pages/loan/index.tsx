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
import { FilterRoute } from "@/components/filterTables/filterRoute";
import { useEffect, useState } from "react";
import { formatFrequency } from "@/utils/format-frequency";
import { FilterFrequency } from "@/components/filterTables/filterFrequency";
import { getPaginationLoans } from "@/services/loan";
import { IPaginationResponse } from "@/utils/fetch-data";
import { formatLoanStatus } from "@/utils/format-loanState";

export default function LoanPage() {
  const { formValues: search, handleInputChange } = useForm({
    search_dni: ''
  })
  const [routeFilter, setRouteFilter] = useState<string>('')
  const [frequencyFilter, setFrequencyFilter] = useState<string>('')
  const [loans, setLoans] = useState<ILoanTable[]>([])

  const handleSetRouteFilter = (route: string) => setRouteFilter(route)
  const handleSetFrequency = (route: string) => setRouteFilter(route)

  useEffect(() => {
    getPaginationLoans({ page: 1, limit: 20, filter: '' })
      .then((response) => {
        if (response.success) {
          const { data, total_data, total_page, page, limit } = response.data as IPaginationResponse
          setLoans(data as any)
        }
      })
  }, [])

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
              <TableHead className="text-gray-800 font-bold py-4 px-6">Nombre del cliente</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Cédula</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Monto solicitado</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Deuda Restante</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Tipo de Prestamo</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Ruta</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Estado</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id} className="border-b">
                <TableCell className="py-4 px-6 font-semibold">{loan.client_name}</TableCell>
                <TableCell className="py-4 px-6">{loan.dni}</TableCell>
                <TableCell className="py-4 px-6">{formatPrice(Number(loan.amount))}</TableCell>
                <TableCell className="py-4 px-6">{formatPrice(Number(loan.remaining_debt))}</TableCell>
                <TableCell className="py-4 px-6">{formatFrequency(loan.frequency)}</TableCell>
                <TableCell className="py-4 px-6">{loan.route}</TableCell>
                <TableCell className={`py-4 px-6 font-bold ${loan.status === 'paid' ? 'text-green-600' : loan.status === 'pending' ? 'text-gray-600' : loan.status === 'active' ? 'text-blue-600' : 'text-gray-900'
                  }`}>{formatLoanStatus(loan.status)}</TableCell>

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
