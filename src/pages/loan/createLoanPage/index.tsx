import { LayuotPage } from "@/components/layuotPage";
import useForm from "@/hooks/useForm";
import { ICreateClient } from "@/types/clients";
import { ICreateLoan } from "@/types/loans";
import { toast } from "sonner";
import { PreviewClientInfo } from "./components/previewClientInfo";
import { FormLoanDetails } from "./components/formLoanDetails";
import { FormSearchClientByDni } from "./components/formSearchClientByDni";
import { useEffect, useState } from "react";
import { getClienByDni } from "@/services/client";
import { PreviewPaymentSchedule } from "./components/previewPaymentSchedule";

export default function CreateLoanPage() {
  const { formValues: search, handleInputChange: handleInputChangeDni } = useForm({
    dni: ''
  })
  const { formValues, handleInputChange } = useForm<ICreateLoan>({
    client_id: -1,
    amount: 0,
    loan_date: '',
    interest_rate: 0,
    frequency: 'daily',
    total_payments: 0,
    payment_amount: 0,
    total_recovered: 0
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
      setClient({} as any)
      handleInputChange({ target: { name: 'client_id', value: -1 } } as any)

    }

    setIsLoading(false)
  }

  useEffect(() => {
    const total_recovered = (Number(formValues.amount) * (Number(formValues.interest_rate) / 100)) + Number(formValues.amount)
    handleInputChange({ target: { name: 'total_recovered', value: total_recovered } } as any)
  }, [formValues.amount, formValues.interest_rate])

  return (
    <LayuotPage title="Nuevo Prestamo" description="Por favor llene todos los campos requeridos">
      <div className="flex flex-col gap-6">
        <FormSearchClientByDni search={search} handleInputChangeDni={handleInputChangeDni} handleSearchClientDni={handleSearchClientDni} />
        <PreviewClientInfo client={client} isLoading={isLoading} />
        <div className="flex justify-between gap-2">
          <FormLoanDetails formValues={formValues} handleInputChange={handleInputChange} />
          <PreviewPaymentSchedule frequency={formValues.frequency} total_recovered={formValues.total_recovered} amount={formValues.amount} interest_rate={formValues.interest_rate} loan_date={formValues.loan_date}
            total_payments={Number(formValues.total_payments)}
          />
        </div>
      </div>
    </LayuotPage>
  )
}