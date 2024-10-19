import { Input } from "@/components/ui/input"
import { ICreateLoan } from "@/types/loans"
import { FrequencyPayment } from "./frequencyPayment"
import { PaymentTerm } from "./paymentTerm"


interface IProps {
  formValues: ICreateLoan
  handleInputChange: (e: any) => void
}

export const FormLoanDetails = ({ formValues, handleInputChange }: IProps) => {
  const handleChangeValuePopover = (name: string, value: string) => {
    handleInputChange({ target: { name, value } })
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Detalles de aplicacion de prestamo</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Por favor llene los siguientes campos</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Monto a desembolsar</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Input type="number" placeholder="0" value={formValues.amount} name="amount" onChange={handleInputChange} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Tasa de interes (%)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Input type="number" placeholder="0" value={formValues.interest_rate} name="interest_rate" onChange={handleInputChange} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Frecuencia de pago</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <FrequencyPayment handleSetFrequency={handleChangeValuePopover} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Plazo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <PaymentTerm handleSetFrequency={handleChangeValuePopover} frequency={formValues.frequency} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de inicio</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Input type="date" value={formValues.load_date} name="load_date" onChange={handleInputChange} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}