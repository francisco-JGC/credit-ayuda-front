import { LayuotPage } from "@/components/layuotPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForm from "@/hooks/useForm";
import { getClientById, updateClientById } from "@/services/client";
import { getAllRoutes } from "@/services/route";
import { ICreateClient } from "@/types/clients";
import { IRoute } from "@/types/routes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function UpdateClientPage() {
  const [routes, setRoutes] = useState<IRoute[]>([])
  const { formValues, handleInputChange, setValues } = useForm<ICreateClient>({
    name: '',
    dni: '',
    primary_address: '',
    primary_phone: '',
    secondary_address: '',
    secondary_phone: '',
    business_type: '',
    route_name: ''
  })

  const params = useParams()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    toast.loading('Actualizando información...')

    const response = await updateClientById(Number(params.id), formValues)
    toast.dismiss()

    if (response.success) {
      toast.success('Información actualizada con exito')
    } else {
      toast.error('Hubo un error', {
        description: response.message
      })
    }
  }

  useEffect(() => {
    getAllRoutes()
      .then(response => {
        if (response.success) {
          setRoutes(response.data as any)
        }
      })

    getClientById(Number(params.id))
      .then((response) => {
        if (response.success) {
          setValues(response.data as any)
        }
      })
  }, [params.id])

  return (
    <LayuotPage title="Actualizar informacion del cliente" description="Por favor llene todos los campos requeridos">
      <form className="grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Nombre del cliente *</label>
          <Input value={formValues.name} name="name" onChange={handleInputChange} placeholder="Julio Perez" required />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Cedula de identidad *</label>
          <Input value={formValues.dni} name="dni" onChange={handleInputChange} placeholder="281-XXXXXX-XXXXX" required />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Teléfono Principal *</label>
          <Input value={formValues.primary_phone} name="primary_phone" onChange={handleInputChange} type="number" required />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Teléfono secundario</label>
          <Input value={formValues.secondary_phone} name="secondary_phone" onChange={handleInputChange} type="number" />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Dirección Principal *</label>
          <Input value={formValues.primary_address} name="primary_address" onChange={handleInputChange} required />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Dirección secundaria</label>
          <Input value={formValues.secondary_address} name="secondary_address" onChange={handleInputChange} />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Tipo de Negocio *</label>
          <Input value={formValues.business_type} name="business_type" onChange={handleInputChange} required />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Seleccione una ruta *</label>
          <select name="route_name" value={formValues.route_name} defaultValue={formValues.route_name} className="p-[6px] rounded-lg border" required
            onChange={handleInputChange}
          >
            <option value="" disabled>Seleccione</option>
            {
              routes.map((route, index) => {
                return (
                  <option value={route.name} key={index}>{route.name}</option>
                )
              })
            }
          </select>
        </div>

        <div>
          <Button typeof='submit' className="bg-indigo-500">Actualizar cliente</Button>
        </div>
      </form>
    </LayuotPage>
  )
}