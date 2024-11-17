import { Spinner } from "@/components/spinner"
import { Input } from "@/components/ui/input"
import { ICreateClient } from "@/types/clients"

interface IProps {
  client: ICreateClient
  isLoading: boolean
}

export const PreviewClientInfo = ({ client, isLoading }: IProps) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg">
      <div>
        <h3 className="font-bold text-lg">Información del cliente</h3>
        {/* <Button variant={'link'} className="p-0 text-indigo-500 opacity-70 hover:opacity-100">Modificar informacion del cliente</Button> */}
      </div>
      {
        isLoading ? (
          <div className="flex items-center justify-center flex-col gap-2 min-h-[150px] ">
            <Spinner />
            <span>Cargando información...</span>
          </div>
        ) :
          (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label htmlFor="" className=" text-gray-500">Nombre del cliente</label>
                <Input value={client.name} name="name" disabled className="bg-gray-200" />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="" className=" text-gray-500">Cedula de identidad</label>
                <Input value={client.dni} name="dni" disabled className="bg-gray-200" />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="" className=" text-gray-500">Teléfono Principal</label>
                <Input value={client.primary_phone} name="primary_phone" disabled className="bg-gray-200" />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="" className=" text-gray-500">Dirección Principal</label>
                <Input value={client.primary_address} name="primary_phone" disabled className="bg-gray-200" />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="" className=" text-gray-500">Ruta</label>
                <Input value={client.route_name} name="primary_phone" disabled className="bg-gray-200" />
              </div>
            </div>
          )
      }
    </div>
  )
}