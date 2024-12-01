import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ILoan } from '@/types/loans'

interface ClientDetailsProps {
  loan?: ILoan
  isLoading: boolean
}

export function ClientDetails({ loan, isLoading }: ClientDetailsProps) {
  return (
    <Card className="shadow-sm h-full rounded-sm">
      <CardHeader>
        <CardTitle>Información del cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="">
            <p className="text-muted-foreground">Nombre:</p>
            {isLoading && <Skeleton className="h-4" />}
            {loan != null && !isLoading && <p>{loan.client.name}</p>}
          </div>
          <div>
            <p className="text-muted-foreground">Cédula:</p>
            {isLoading && <Skeleton className="h-4" />}
            {loan != null && !isLoading && <p>{loan.client.dni}</p>}
          </div>
          <div>
            <p className="text-muted-foreground">Teléfono:</p>
            {isLoading && <Skeleton className="h-4" />}
            {loan != null && !isLoading && <p>{loan.client.primary_phone}</p>}
          </div>
          <div>
            <p className="text-muted-foreground">Ruta:</p>
            {isLoading && <Skeleton className="h-4" />}
            {loan != null && !isLoading && <p>{loan.client.route?.name}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
