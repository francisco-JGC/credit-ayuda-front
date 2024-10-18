import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForm from "@/hooks/useForm";
import { LayuotPage } from "@/components/layuotPage";
import { toast } from "sonner";
import { createRoute } from "@/services/route";

export default function CreateRoutePage() {
  const { formValues, handleInputChange, resetForm } = useForm({
    name: '',
    description: ''
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!formValues.name) {
      return toast.warning('Por favor ingrese el nombre de la ruta')
    }

    toast.loading('Creando ruta...')

    const response = await createRoute(formValues)
    toast.dismiss()

    if (response.success) {
      toast.success('Se ha creado una nueva ruta')
      resetForm()
    } else {
      toast.error('Sucedio un error al crear la ruta', {
        description: response.message
      })
    }
  }

  return (
    <LayuotPage title="Crear nuevo ruta" description="Por favor llene todos los campos requeridos">
      <form className="grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Nombre de la  ruta*</label>
          <Input value={formValues.name} name="name" onChange={handleInputChange} placeholder="Ruta" required />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold">Descripción <span className="text-gray-400">(opcional)</span></label>
          <Input value={formValues.description} name="dni" onChange={handleInputChange} placeholder="..." />
        </div>

        <div>
          <Button typeof='submit' className="bg-indigo-500">Crear Ruta</Button>
        </div>
      </form>
    </LayuotPage>

  );
}
