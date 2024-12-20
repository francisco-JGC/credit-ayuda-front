import { CreateRegisterModal } from './components/create-register-modal'
import { GeneralCashDetails } from './components/general-details'
import { RegistersTable } from './components/registers-table'
import { useRegisters } from './hooks/use-registers'

export function CashPage() {
  const { registers, isLoading } = useRegisters()
  const mostRecentRegister = [...(registers ?? [])].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )[0]

  const { id, created_at, ...rest } = mostRecentRegister ?? {}

  return (
    <div className="container mx-auto p-4">
      <div className="flex lg:justify-between flex-col lg:flex-row gap-y-4">
        <div>
          <h2 className="text-2xl font-medium">Caja chica</h2>
          <p className="text-sm text-muted-foreground">
            Gestión de los retiros, préstamos, ahorros e ingresos.
          </p>
        </div>
        <div>{<CreateRegisterModal mostRecentRegister={rest} />}</div>
      </div>
      <section className="mt-8">
        {mostRecentRegister != null && (
          <GeneralCashDetails lastRegister={mostRecentRegister} />
        )}
      </section>

      <section className="w-full mt-8">
        {registers != null && !isLoading && (
          <RegistersTable registers={registers} />
        )}
      </section>
    </div>
  )
}
