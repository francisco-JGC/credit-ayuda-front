import { SkeletonTableRows } from '@/components/skeleton-table-rows'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ILoan,
  IPaymentSchedule,
  PaymentStatus as PaymentStatusType,
} from '@/types/loans'
import { frequencyMap } from '@/utils/contants'
import { formatDateLong } from '@/utils/date-format'
import { formatPrice } from '@/utils/price-format'
import { PrinterIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PaymentStatus, StatusBadge } from './payment-status'
import { useMobile } from '@/hooks/use-mobile'

interface PaymentsTableProps {
  loan?: ILoan
  isLoading: boolean
  onAddPayment: (payment: IPaymentSchedule) => void
}

export function PaymentsTable({
  loan,
  isLoading,
  onAddPayment,
}: PaymentsTableProps) {
  const payments = [...(loan?.payment_plan.payment_schedules ?? [])].sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
  )

  const generalPayments = payments.filter(
    (payment) => payment.status === 'paid',
  )

  const totalPaid = payments.reduce(
    (acc, payment) => acc + Number(payment.amount_paid),
    0,
  )

  const totalDebt = +(loan?.total_recovered ?? 0) - totalPaid

  const totalPendingPayments = payments.filter(
    (payment) => payment.status === 'pending',
  ).length

  const totalLatePayments = payments.filter(
    (payment) => payment.status === 'late',
  ).length

  const totalLatePayment = payments
    .filter((payment) => payment.status === 'late')
    .reduce((acc, payment) => acc + Number(payment.amount_due), 0)

  const canAddPaymentAmount = (paymentStatus: PaymentStatusType) => {
    const allowedStatuses = ['pending']

    return allowedStatuses.includes(paymentStatus)
  }
  const { isMobile } = useMobile()

  return (
    <Tabs defaultValue="calendar">
      <Card className="h-full shadow-sm rounded-sm flex flex-col">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Pagos</CardTitle>
              {isLoading && <Skeleton className="h-4 w-20" />}
              {loan != null && !isLoading && (
                <CardDescription>
                  {frequencyMap[loan.payment_plan.frequency]}
                </CardDescription>
              )}
            </div>
            <div>
              <TabsList>
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-full flex flex-col">
            <TabsContent value="calendar">
              <div className="border rounded-lg overflow-auto">
                <Table className="table-auto">
                  <TableHeader className="bg-gray-100">
                    <TableRow className="lg:[&>th]:px-4 [&>th]:text-xs">
                      {isMobile && <TableHead></TableHead>}
                      <TableHead>ID</TableHead>
                      <TableHead>Fecha de abono</TableHead>
                      <TableHead>Fecha de pago</TableHead>
                      <TableHead>Monto restante</TableHead>
                      <TableHead>Monto abonado</TableHead>
                      <TableHead>Estado</TableHead>
                      {!isMobile && <TableHead></TableHead>}
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading && <SkeletonTableRows columns={5} rows={6} />}
                    {loan != null &&
                      !isLoading &&
                      payments.map((payment) => (
                        <TableRow key={payment.id} className="hover:bg-inherit">
                          {isMobile && (
                            <TableCell className="">
                              <div>
                                {canAddPaymentAmount(payment.status) && (
                                  <Button
                                    onClick={() => onAddPayment(payment)}
                                    variant="secondary"
                                    size="sm"
                                  >
                                    Agregar abono
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          )}
                          <TableCell className="font-semibold">
                            #{payment.id}
                          </TableCell>
                          <TableCell>
                            {formatDateLong(payment.due_date)}
                          </TableCell>
                          <TableCell>
                            {payment.paid_date &&
                              formatDateLong(payment.paid_date)}
                          </TableCell>
                          <TableCell>
                            {formatPrice(Number(payment.amount_due))}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status="paid">
                              {formatPrice(Number(payment.amount_paid))}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>
                            <PaymentStatus status={payment.status} />
                          </TableCell>
                          {!isMobile && (
                            <TableCell className="">
                              <div>
                                {canAddPaymentAmount(payment.status) && (
                                  <Button
                                    onClick={() => onAddPayment(payment)}
                                    variant="secondary"
                                    size="sm"
                                  >
                                    Agregar abono
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          )}
                          <TableCell>
                            <div className="flex justify-center">
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  to={`/prints/payments/${payment.id}`}
                                  target="_blank"
                                >
                                  <PrinterIcon
                                    strokeWidth={1}
                                    className="size-6"
                                  />
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="general">
              <div className="border rounded-lg overflow-auto">
                <Table className="table-auto">
                  <TableHeader className="bg-gray-100">
                    <TableRow className="lg:[&>th]:px-4 [&>th]:text-xs">
                      <TableHead>ID</TableHead>
                      <TableHead>Recibido</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading && <SkeletonTableRows columns={5} rows={6} />}
                    {loan != null &&
                      !isLoading &&
                      generalPayments.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="lg:text-center">
                            No hay pagos realizados
                          </TableCell>
                        </TableRow>
                      )}
                    {loan != null &&
                      !isLoading &&
                      generalPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-semibold">
                            #{payment.id}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status="paid">
                              {formatPrice(Number(payment.amount_paid))}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>
                            {formatDateLong(payment.due_date)}
                          </TableCell>
                          <TableCell>{loan.client.name}</TableCell>
                          <TableCell>
                            <div className="flex justify-center">
                              <Button variant="outline" size="sm">
                                <PrinterIcon
                                  strokeWidth={1}
                                  className="size-6"
                                />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <div className="mt-auto grid grid-cols-2 lg:grid-cols-4 gap-2 pt-8 text-sm">
              <div>
                {loan != null && !isLoading && (
                  <p className="inline-flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Total abonado:
                    </span>{' '}
                    {formatPrice(totalPaid)}
                  </p>
                )}
                {isLoading && <Skeleton className="h-4 w-32" />}
              </div>
              <div>
                {loan != null && !isLoading && (
                  <p className="inline-flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Saldo pendiente:
                    </span>{' '}
                    {formatPrice(totalDebt)}
                  </p>
                )}
                {isLoading && <Skeleton className="h-4 w-32" />}
              </div>
              <div>
                {loan != null && !isLoading && (
                  <p className="inline-flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Monto atrasado:
                    </span>{' '}
                    {formatPrice(totalLatePayment)}
                  </p>
                )}
                {isLoading && <Skeleton className="h-4 w-32" />}
              </div>
              <div>
                {loan != null && !isLoading && (
                  <p className="inline-flex flex-col">
                    <span className="text-muted-foreground text-sm">
                      Abonos:
                    </span>{' '}
                    {payments.length}
                  </p>
                )}
                {isLoading && <Skeleton className="h-4 w-32" />}
              </div>
              <div className="lg:col-span-2">
                {loan != null && !isLoading && (
                  <p className="inline-flex flex-col">
                    <span className="text-muted-foreground text-sm">
                      Abonos pendientes:
                    </span>{' '}
                    {totalPendingPayments}
                  </p>
                )}
                {isLoading && <Skeleton className="h-4 w-32" />}
              </div>
              <div>
                {loan != null && !isLoading && (
                  <p className="inline-flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Abonos atrasados:
                    </span>{' '}
                    {totalLatePayments}
                  </p>
                )}
                {isLoading && <Skeleton className="h-4 w-32" />}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Tabs>
  )
}
