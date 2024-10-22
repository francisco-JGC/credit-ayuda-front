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
import { Button } from "@/components/ui/button";
import { createLoan } from "@/services/loan";

export default function CreateLoanPage() {
  const { formValues: search, handleInputChange: handleInputChangeDni } = useForm({
    dni: ''
  })
  const { formValues, handleInputChange, resetForm } = useForm<ICreateLoan>({
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

  const validateForm = (formValues: ICreateLoan): string[] => {
    const errors: string[] = [];

    if (formValues.client_id <= 0) {
      errors.push("La identificación del cliente no es valida");
    }

    if (!formValues.loan_date.trim()) {
      errors.push("Ingrese una fecha de prestamo");
    }

    if (formValues.interest_rate <= 0) {
      errors.push("La tasa de interes deberia ser mayor a 0");
    }

    const validFrequencies = ['daily', 'weekly', 'biweekly', 'monthly', 'yearly'];
    if (!validFrequencies.includes(formValues.frequency)) {
      errors.push("Seleccione una frecuencia de pago valida");
    }

    if (formValues.total_payments <= 0) {
      errors.push("Seleccione el plazo de pagos");
    }

    if (formValues.amount <= 0) {
      errors.push("El monto a desembolsar debe ser mayor a 0");
    }

    return errors;
  };

  const handleCreateLoan = async () => {
    const errors = validateForm(formValues);

    if (errors.length > 0) {
      return toast.error('La informacion esta imcompleta', {
        description: `${errors.map((error) => error).join(' ❌ ')}`
      })
    }

    toast.loading('Creando prestamo de cliente...', {
      description: 'por favor espere un momento...'
    })

    const response = await createLoan(formValues)
    toast.dismiss()

    if (response.success) {
      toast.success('Se ha enviado la solicitud del prestamo')
      resetForm()
    } else {
      toast.error('Ocurrio un error', {
        description: response.message
      })
    }
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
        <div className="flex gap-2 flex-col md:justify-between md:flex-row">
          <FormLoanDetails formValues={formValues} handleInputChange={handleInputChange} />
          <PreviewPaymentSchedule frequency={formValues.frequency} total_recovered={formValues.total_recovered} amount={formValues.amount} interest_rate={formValues.interest_rate} loan_date={formValues.loan_date}
            total_payments={Number(formValues.total_payments)} />
        </div>
      </div>

      <div>
        <Button onClick={handleCreateLoan} className="bg-indigo-500 hover:bg-indigo-600">Crear Solicitud de Prestamo</Button>
      </div>
    </LayuotPage>
  )
}