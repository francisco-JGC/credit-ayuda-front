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
import { IRoute } from "@/types/routes";
import { Actions } from "./components/actions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useForm from "@/hooks/useForm";

const items: IRoute[] = [
  {
    id: 1,
    name: 'Ruta 1',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it",
  },
  {
    id: 2,
    name: 'Ruta 2',
  },
  {
    id: 3,
    name: 'Ruta 3',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it",
  },
];

export default function RoutesPage() {
  const { formValues: search, handleInputChange } = useForm({
    route_name: ''
  })

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link to={'/routes/create'}>
          <Button className="w-full md:w-auto">Crear ruta</Button>
        </Link>

        <div className="flex flex-col md:flex-row justify-between gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[350px]">
            <Search className="text-gray-500 absolute top-2 left-2" width={19} />
            <Input
              placeholder="Nombre de la ruta..."
              className="pl-10 w-full"
              name="route_name"
              onChange={handleInputChange}
              value={search.route_name}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <Table className="w-full">
          <TableCaption>Lista de rutas</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-gray-800 font-bold py-4 px-6 w-[300px]">Nombre de la Ruta</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6">Descripción</TableHead>
              <TableHead className="text-gray-800 font-bold py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((route) => (
              <TableRow key={route.id} className="border-b">
                <TableCell className="py-4 px-6 font-semibold">{route.name}</TableCell>
                <TableCell className="py-4 px-6">{route.description}</TableCell>
                <TableCell className="py-4 px-6">
                  <Actions route={route} />
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
