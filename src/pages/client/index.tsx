import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/utils/price-format'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Actions } from './components/actions'
import { useClients } from './hooks/use-client'
import { LoansPagination } from '../loan/components/loans-pagination'
import { FilterRoute } from '@/components/filterTables/filterRoute'

export default function ClientPage() {
  const {
    clients,
    searchByDni,
    currentPage,
    goToPage,
    totalPages,
    filterByRoute,
  } = useClients({ limit: 10 })

  return (
    <div className="">
      <div className="flex justify-between w-full">
        <div>
          <h1 className="font-semibold text-2xl">Clientes</h1>
          <p className="text-sm text-muted-foreground">
            Gestión de los clientes.
          </p>
        </div>
        <div>
          <Link to={'/clients/create'}>
            <Button className="w-full md:w-auto">Nuevo cliente</Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 w-full flex justify-between">
        <div className="relative">
          <Search className="text-gray-500 absolute top-2 left-2" width={19} />
          <Input
            placeholder="Cédula del cliente..."
            className="pl-10 w-full"
            name="search_dni"
            onChange={(e) => searchByDni(e.target.value)}
          />
        </div>
        <div>
          <FilterRoute onChangeRoute={filterByRoute} />
        </div>
      </div>
      <div className="flex justify-end mt-4 mb-4">
        <LoansPagination
          currentPage={currentPage}
          goToPage={goToPage}
          totalPages={totalPages}
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableCaption>Lista de clientes</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-gray-800 font-bold py-4 px-6">
                Nombre del Cliente
              </TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">
                Cédula
              </TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">
                Teléfono
              </TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">
                Dirección
              </TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">
                Deuda Actual
              </TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">
                Ruta
              </TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">
                Estado de préstamo
              </TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients &&
              clients.map((client) => (
                <TableRow key={client.id} className="border-b">
                  <TableCell className="py-4 px-6 font-semibold">
                    {client.name}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold">
                    {client.dni}
                  </TableCell>
                  <TableCell className="py-4 px-6">{client.phone}</TableCell>
                  <TableCell className="py-4 px-6">{client.address}</TableCell>
                  <TableCell className="py-4 px-6">
                    {formatPrice(client.current_debt)}
                  </TableCell>
                  <TableCell className="py-4 px-6">{client.route}</TableCell>
                  <TableCell
                    className={`py-4 px-6 font-bold ${
                      client.loan_status === 'active'
                        ? 'text-green-500'
                        : client.loan_status === 'pending'
                        ? 'text-yellow-500'
                        : client.loan_status === 'paid'
                        ? 'text-indigo-500'
                        : client.loan_status === 'rejected'
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }
                    }`}
                  >
                    {client.loan_status === 'active'
                      ? 'Activo'
                      : client.loan_status === 'pending'
                      ? 'Pendiente'
                      : client.loan_status === 'paid'
                      ? 'Pagado'
                      : client.loan_status === 'rejected'
                      ? 'Rechazado'
                      : 'Sin prestamo'}
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
  )
}
