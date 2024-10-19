import { LayuotPage } from "@/components/layuotPage";
import useForm from "@/hooks/useForm";
import { ICreateClient } from "@/types/clients";
import { ICreateLoan } from "@/types/loans";
import { toast } from "sonner";
import { PreviewClientInfo } from "./components/previewClientInfo";
import { FormLoanDetails } from "./components/formLoanDetails";
import { FormSearchClientByDni } from "./components/formSearchClientByDni";
import { useState } from "react";
import { getClienByDni } from "@/services/client";

export default function CreateLoanPage() {
  const { formValues: search, handleInputChange: handleInputChangeDni } = useForm({
    dni: ''
  })
  const { formValues, handleInputChange } = useForm<ICreateLoan>({
    client_id: -1,
    amount: 0,
    load_date: '',
    interest_rate: 0,
    frequency: 'daily',
    total_payments: 0,
    payment_amount: 0,
  })

  const [client, setClient] = useState<ICreateClient>({} as any)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearchClientDni = async (e: any) => {
    e.preventDefault()

    toast.loading('Buscando cliente...')
    setIsLoading(true)

    const response = await getClienByDni(search.dni)
    toast.dismiss()

    if (response.success) {
      toast.success('Información del cliente cargada')
      setClient(response.data as any)
      handleInputChange({ target: { name: 'client_id', value: (response.data as any).id } } as any)
    } else {
      toast.error('Hubo un error al cargar la información cliente', {
        description: response.message
      })
    }

    setIsLoading(false)
  }

  return (
    <LayuotPage title="Nuevo Prestamo" description="Por favor llene todos los campos requeridos">
      <div className="flex flex-col gap-6">
        <FormSearchClientByDni search={search} handleInputChangeDni={handleInputChangeDni} handleSearchClientDni={handleSearchClientDni} />
        <PreviewClientInfo client={client} isLoading={isLoading} />
        <FormLoanDetails formValues={formValues} handleInputChange={handleInputChange} />
      </div>
    </LayuotPage>
  )
}