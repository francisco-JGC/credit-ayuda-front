import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ILoan } from '@/types/loans'

export function ClientDetails({ loan }: { loan: ILoan }) {
  return (
    <Card className="shadow-sm h-full rounded-sm">
      <CardHeader>
        <CardTitle>Información del cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="">
            <p className="text-muted-foreground">Nombre:</p>
            <p>{loan.client.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Cédula:</p>
            <p>{loan.client.dni}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Teléfono:</p>
            <p>{loan.client.primary_phone}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Ruta:</p>
            <p>{loan.client.route?.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
