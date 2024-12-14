import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ILoan } from '@/types/loans'

export function ClientLoansDetails({ loans }: { loans: ILoan[] }) {
  console.log({ loans })
  return (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>Detalles</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </article>
  )
}
