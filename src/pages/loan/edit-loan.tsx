import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  loanStatus,
  paymentStatusMap,
  penaltyStatus,
  penaltyStatusMap,
  statusMap,
} from '@/utils/contants'
import { useParams } from 'react-router-dom'
import { useClients } from '../client/hooks/use-client'
import { useLoanDetails } from '../payments/hook/use-loan-details'
import { toast } from 'sonner'
import { useUpdateLoan } from '../requests/hooks/use-update-loan'
import {
  ILoan,
  IPaymentSchedule,
  IPenaltyPaymentSchedule,
  LoanStatus,
  PaymentStatus,
  PenaltyStatus,
} from '@/types/loans'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { IClient } from '@/types/clients'

export function EditLoanPage() {
  const { id } = useParams()
  const { clients } = useClients()
  const { loan } = useLoanDetails({ id: Number(id) })
  const { update } = useUpdateLoan()
  const defaultClientId = loan?.client.id.toString()
  const [paymentSchedules, setPaymentSchedules] = useState<IPaymentSchedule[]>(
    [],
  )
  const [penaltyPaymentSchedules, setPenaltyPaymentSchedules] = useState<
    IPenaltyPaymentSchedule[]
  >([])

  useEffect(() => {
    setPaymentSchedules(
      (structuredClone(loan?.payment_plan.payment_schedules) ?? []).sort(
        (a, b) => a.id - b.id,
      ),
    )
    setPenaltyPaymentSchedules(
      (
        structuredClone(loan?.penalty_plan?.penalty_payment_schedules) ?? []
      ).sort((a, b) => a.id - b.id),
    )
  }, [loan])

  const updatePaymentSchedule = (
    id: number,
    data: Partial<IPaymentSchedule>,
  ) => {
    const newPaymentSchedules = paymentSchedules?.map((schedule) => {
      if (schedule.id === id) {
        return {
          ...schedule,
          ...data,
        }
      }

      return schedule
    })

    setPaymentSchedules(newPaymentSchedules)
  }

  const updatePenaltyPaymentSchedule = (
    id: number,
    data: Partial<IPenaltyPaymentSchedule>,
  ) => {
    const newPenaltyPaymentSchedules = penaltyPaymentSchedules?.map(
      (schedule) => {
        if (schedule.id === id) {
          return {
            ...schedule,
            ...data,
          }
        }

        return schedule
      },
    )

    setPenaltyPaymentSchedules(newPenaltyPaymentSchedules)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const clientId = Number(formData.get('client')?.toString())
    const amount = Number(formData.get('amount')?.toString())
    const interest_rate = Number(formData.get('interest_rate')?.toString())
    const status = formData.get('status')?.toString() as LoanStatus
    const loan_date = formData.get('loan_date')?.toString()
    const total_recovered = Number(formData.get('total_recovered')?.toString())
    const total_pending = Number(formData.get('total_pending')?.toString())

    const client = clients.find((client) => client.id === clientId)
    if (client == null) {
      toast.error('El cliente seleccionado no existe.')
      return
    }

    if (loan == null) {
      toast.error('El préstamo seleccionado no existe.')
      return
    }

    if (loan_date == null || status == null) {
      toast.error('La fecha de inicio y el estado son requeridos.')
      return
    }

    const newLoan: ILoan = {
      ...loan,
      client: client as unknown as IClient,
      amount,
      interest_rate,
      status,
      loan_date,
      total_recovered,
      total_pending,
      payment_plan: {
        ...loan.payment_plan,
        payment_schedules: paymentSchedules,
      },
    }

    if (loan.penalty_plan != null) {
      newLoan.penalty_plan = {
        ...loan.penalty_plan,
        penalty_payment_schedules: penaltyPaymentSchedules,
      }
    }

    update(newLoan)
      .then(() => {
        toast.success('Préstamo actualizado correctamente.')
      })
      .catch(() => {
        toast.error('Ocurrió un error al actualizar el préstamo.')
      })
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-6">
          <h2 className="text-2xl font-medium">Préstamo #{id}</h2>
          <p className="text-sm text-muted-foreground">
            Edita la información del préstamo.
          </p>
        </div>
        <div>
          <Button type="submit" form="edit-loan-form">
            Guardar cambios
          </Button>
        </div>
      </div>

      <section className="">
        <h3 className="font-semibold mb-2">
          Actualiza la información del préstamo
        </h3>
        <form
          id="edit-loan-form"
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <div>
            <Label>Cliente</Label>
            {loan != null && (
              <Select name="client" defaultValue={defaultClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Cliente del préstamo" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div>
            <Label htmlFor="amount">Monto C$</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              defaultValue={loan?.amount}
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-2">
            <div>
              <Label htmlFor="interest_rate">Tasa de interés %</Label>
              <Input
                type="number"
                id="interest_rate"
                name="interest_rate"
                defaultValue={loan?.interest_rate}
              />
            </div>

            <div>
              <Label htmlFor="status">Estado</Label>
              {loan != null && (
                <Select name="status" defaultValue={loan.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado del préstamo" />
                  </SelectTrigger>
                  <SelectContent>
                    {loanStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusMap[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="loan_date">Fecha de inicio</Label>
            <Input
              type="date"
              id="loan_date"
              name="loan_date"
              defaultValue={loan?.loan_date}
            />
          </div>
          <div>
            <Label htmlFor="total_recovered">Total recuperación C$</Label>
            <Input
              type="number"
              id="total_recovered"
              name="total_recovered"
              defaultValue={loan?.total_recovered}
            />
          </div>
          <div>
            <Label htmlFor="total_pending">Total pendiente C$</Label>
            <Input
              type="number"
              id="total_pending"
              name="total_pending"
              defaultValue={loan?.total_pending}
            />
          </div>
        </form>
      </section>

      <section className="mt-8">
        <h3 className="font-semibold mb-2">
          Actualiza la información de los abonos
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Fecha de abono</TableHead>
              <TableHead>Fecha de pago</TableHead>
              <TableHead>Monto restante</TableHead>
              <TableHead>Monto abonado</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentSchedules?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>#{payment.id}</TableCell>
                <TableCell>
                  <div className="w-[120px]">
                    <Input
                      className="w-fit"
                      type="date"
                      value={payment.due_date}
                      onChange={(e) => {
                        const newValue = e.currentTarget.value
                        updatePaymentSchedule(payment.id, {
                          due_date: newValue,
                        })
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-[120px]">
                    <Input
                      className="w-fit"
                      type="date"
                      value={payment.paid_date ?? ''}
                      onChange={(e) => {
                        const newValue = e.currentTarget.value
                        updatePaymentSchedule(payment.id, {
                          paid_date: newValue,
                        })
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-[120px] flex gap-1 items-center">
                    C$
                    <Input
                      type="number"
                      value={payment.amount_due}
                      onChange={(e) => {
                        const newValue = e.currentTarget.value
                        updatePaymentSchedule(payment.id, {
                          amount_due: newValue,
                        })
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-[120px] flex gap-1 items-center">
                    C$
                    <Input
                      type="number"
                      value={payment.amount_paid}
                      onChange={(e) => {
                        const newValue = e.currentTarget.value
                        updatePaymentSchedule(payment.id, {
                          amount_paid: newValue,
                        })
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={payment.status}
                    onValueChange={(newValue) => {
                      updatePaymentSchedule(payment.id, {
                        status: newValue as PaymentStatus,
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {['paid', 'pending', 'late'].map((status) => (
                        <SelectItem key={status} value={status}>
                          {paymentStatusMap[status as PaymentStatus]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {loan?.penalty_plan != null && (
        <section className="mt-8 mb-4">
          <h3 className="font-semibold mb-2">
            Actualiza la información de los abonos de mora
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha de pago</TableHead>
                <TableHead>Monto pendiente</TableHead>
                <TableHead>Monto abonado</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {penaltyPaymentSchedules.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>#{payment.id}</TableCell>
                  <TableCell>
                    <div className="w-[120px]">
                      <Input
                        className="w-fit"
                        type="date"
                        value={payment.dueDate}
                        onChange={(e) => {
                          const newValue = e.currentTarget.value
                          updatePenaltyPaymentSchedule(payment.id, {
                            dueDate: newValue,
                          })
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-[120px] flex gap-1 items-center">
                      C$
                      <Input
                        type="number"
                        value={payment.amount_due}
                        onChange={(e) => {
                          const newValue = +e.currentTarget.value
                          updatePenaltyPaymentSchedule(payment.id, {
                            amount_due: newValue,
                          })
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-[120px] flex gap-1 items-center">
                      C$
                      <Input
                        type="number"
                        value={payment.amount_paid}
                        onChange={(e) => {
                          const newValue = +e.currentTarget.value
                          updatePenaltyPaymentSchedule(payment.id, {
                            amount_paid: newValue,
                          })
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Select
                        value={payment.status}
                        onValueChange={(newValue) => {
                          updatePenaltyPaymentSchedule(payment.id, {
                            status: newValue as PenaltyStatus,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {penaltyStatus.map((status) => (
                            <SelectItem key={status} value={status}>
                              {penaltyStatusMap[status as PenaltyStatus]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  )
}
