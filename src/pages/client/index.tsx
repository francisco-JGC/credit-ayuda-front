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
// import { LoansPagination } from '../loan/components/loans-pagination'
import { FilterRoute } from '@/components/filterTables/filterRoute'
import { useMobile } from '@/hooks/use-mobile'

export default function ClientPage() {
  const { isMobile } = useMobile()

  const {
    clients,
    searchByDni,
    // currentPage,
    // goToPage,
    // totalPages,
    filterByRoute,
  } = useClients({ limit: 10 })

  return (
    <div className="container mx-auto p-4">
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
      <div className="mt-4 w-full flex lg:justify-between flex-col lg:flex-row gap-y-4">
        <div className="relative">
          <Search className="text-gray-500 absolute top-2 left-2" width={19} />
          <Input
            placeholder="Nombre del cliente..."
            className="pl-10 w-full"
            name="search_dni"
            onChange={(e) => searchByDni(e.target.value)}
          />
        </div>
        <div>
          <FilterRoute onChangeRoute={filterByRoute} />
        </div>
      </div>
      {/* <div className="flex justify-end mt-4">
        <LoansPagination
          currentPage={currentPage}
          goToPage={goToPage}
          totalPages={totalPages}
        />
      </div> */}

      <div className="border rounded-lg h-full overflow-x-auto mt-4">
        <Table className="w-full table-auto lg:min-w-[600px]">
          <TableCaption>Lista de clientes</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow className="[&>th]:px-4 [&>th]:text-xs">
              {isMobile && <TableHead></TableHead>}
              <TableHead>Nombre del Cliente</TableHead>
              <TableHead>Cédula</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Deuda Actual</TableHead>
              <TableHead>Ruta</TableHead>
              <TableHead>Estado de préstamo</TableHead>
              {!isMobile && <TableHead></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients &&
              clients.map((client) => (
                <TableRow
                  key={client.id}
                  className="border-b [&>td]:px-2 lg:[&>td]:px-4"
                >
                  {isMobile && (
                    <TableCell className="">
                      <Actions client={client} />
                    </TableCell>
                  )}
                  <TableCell className=" font-semibold">
                    {client.name}
                  </TableCell>
                  <TableCell className="font-semibold">{client.dni}</TableCell>
                  <TableCell className="">{client.phone}</TableCell>
                  <TableCell className="">{client.address}</TableCell>
                  <TableCell className="">
                    {formatPrice(client.current_debt)}
                  </TableCell>
                  <TableCell className="">{client.route}</TableCell>
                  <TableCell
                    className={` font-bold ${client.loan_status === 'active'
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
                  {!isMobile && (
                    <TableCell className="">
                      <Actions client={client} />
                    </TableCell>
                  )}
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
