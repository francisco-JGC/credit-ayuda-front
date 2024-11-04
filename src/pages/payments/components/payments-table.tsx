import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ILoan } from '@/types/loans'
import { frequencyMap } from '@/utils/contants'

export function PaymentsTable({ loan }: { loan: ILoan }) {
  const payments = loan.payment_plan.payment_schedules
  const totalPaid = payments.reduce(
    (acc, payment) => acc + Number(payment.amount_paid),
    0,
  )
  const totalPendingPayments = payments.filter(
    (payment) => payment.status === 'pending',
  ).length
  const totalLatePayments = payments.filter(
    (payment) => payment.status === 'late',
  ).length
  const totalLatePayment = payments
    .filter((payment) => payment.status === 'late')
    .reduce((acc, payment) => acc + Number(payment.amount_due), 0)

  return (
    <Tabs defaultValue="calendar">
      <Card className="h-full shadow-sm rounded-sm flex flex-col">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Pagos</CardTitle>
              <CardDescription>
                {frequencyMap[loan.payment_plan.frequency]}.
              </CardDescription>
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
              <div className="border rounded-lg h-[320px] overflow-auto">
                <Table className="table-fixed">
                  <TableHeader className="bg-gray-100">
                    <TableRow className="[&>th]:px-4 [&>th]:text-xs [&>th]:sticky [&>th]:z-10 [&>th]:top-0">
                      <TableHead>ID</TableHead>
                      <TableHead>Fecha de pago</TableHead>
                      <TableHead>Monto abonado</TableHead>
                      <TableHead>Monto restante</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-semibold">
                          #{payment.id}
                        </TableCell>
                        <TableCell>
                          {new Date(payment.due_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>C${payment.amount_paid ?? 0}</TableCell>
                        <TableCell>C${payment.amount_due ?? 0}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="general">
              <div className="border rounded-lg h-[320px] overflow-auto">
                <Table className="table-fixed">
                  <TableHeader className="bg-gray-100">
                    <TableRow className="[&>th]:px-4 [&>th]:text-xs [&>th]:sticky [&>th]:z-10 [&>th]:top-0">
                      <TableHead>ID</TableHead>
                      <TableHead>Recibido</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead className="w-14"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-semibold">
                          #{payment.id}
                        </TableCell>
                        <TableCell>C${payment.amount_paid ?? 0}</TableCell>
                        <TableCell>
                          {new Date(payment.due_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{loan.client.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <div className="mt-auto grid grid-cols-3 gap-2 pt-4 text-sm">
              <div className="flex gap-1">
                <p>Total abonado: C${totalPaid.toFixed(2)}</p>
              </div>
              <div className="flex gap-1 place-self-center">
                <p>
                  Saldo pendiente: C$
                  {(Number(loan.amount) - totalPaid).toFixed(2)}
                </p>
              </div>
              <div className="flex gap-1 place-self-end">
                <p>Monto atrasado: C${totalLatePayment.toFixed(2)}</p>
              </div>
              <div className="flex gap-1">
                <p>Abonos: {payments.length}</p>
              </div>
              <div className="place-self-center">
                <p>Abonos pendientes: {totalPendingPayments}</p>
              </div>
              <div className="place-self-end">
                <p>Abonos atrasados: {totalLatePayments}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Tabs>
  )
}
