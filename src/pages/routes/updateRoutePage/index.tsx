import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForm from "@/hooks/useForm";
import { LayuotPage } from "@/components/layuotPage";
import { toast } from "sonner";
import { getRouteById, updateRouteById } from "@/services/route";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IRoute } from "@/types/routes";

export default function UpdateRoutePage() {
  const { formValues, handleInputChange, setValues } = useForm<IRoute>({
    id: 0,
    name: '',
    description: ''
  })

  const params = useParams()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!formValues.name) {
      return toast.warning('Por favor ingrese el nombre de la ruta')
    }

    toast.loading('Actualizando información...')

    const response = await updateRouteById(formValues)
    toast.dismiss()

    if (response.success) {
      toast.success('Se ha actualizado la informacion de la ruta')
    } else {
      toast.error('Sucedio un error', {
        description: response.message
      })
    }
  }

  useEffect(() => {
    getRouteById(Number(params.id))
      .then((response) => {
        if (response.success) {
          setValues(response.data as any)
        }
      })
  }, [params.id])

  return (
    <LayuotPage title="Actualizar Ruta" description="Por favor llene todos los campos requeridos">
      <form className="grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Nombre de la  ruta*</label>
          <Input value={formValues.name} name="name" onChange={handleInputChange} placeholder="Ruta" required />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Descripción <span className="text-gray-400">(opcional)</span></label>
          <Input value={formValues.description} name="description" onChange={handleInputChange} placeholder="..." />
        </div>

        <div>
          <Button typeof='submit' className="bg-indigo-500">Actualizar Ruta</Button>
        </div>
      </form>
    </LayuotPage>

  );
}
