import { LayuotPage } from "@/components/layuotPage";
import useForm from "@/hooks/useForm";
import { ICreateClient } from "@/types/clients";
import { ICreateLoan } from "@/types/loans";
import { toast } from "sonner";
import { PreviewClientInfo } from "./components/previewClientInfo";
import { FormLoanDetails } from "./components/formLoanDetails";
import { FormSearchClientByDni } from "./components/formSearchClientByDni";
import { useState } from "react";

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

    // const response = await createClient(formValues)
    // toast.dismiss()

    // if (response.success) {
    //   toast.success('Cliente creado con exito')
    //   resetForm()
    // } else {
    //   toast.error('Hubo un error al crear el cliente', {
    //     description: response.message
    //   })
    // }
  }

  return (
    <LayuotPage title="Nuevo Prestamo" description="Por favor llene todos los campos requeridos">
      <div className="flex flex-col gap-4">
        <FormSearchClientByDni search={search} handleInputChangeDni={handleInputChangeDni} handleSearchClientDni={handleSearchClientDni} />
        <PreviewClientInfo client={client} isLoading={isLoading} />
        <FormLoanDetails formValues={formValues} handleInputChange={handleInputChange} />
      </div>
    </LayuotPage>
  )
}