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
  return (
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
  );
}
