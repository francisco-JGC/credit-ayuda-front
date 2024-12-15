import { Label } from '@/components/ui/label'
import { useParams } from 'react-router-dom'
import { useClients } from '../client/hooks/use-client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLoanDetails } from '../payments/hook/use-loan-details'
import { useState } from 'react'

export function EditLoanPage() {
  const { id } = useParams()
  const { clients } = useClients()
  const { loan } = useLoanDetails({ id: Number(id) })
  const defaultClientId = loan?.client.id.toString()
  const [currentClientId, setCurrentClientId] = useState(defaultClientId)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-medium">Préstamo #{id}</h2>
        <p className="text-sm text-muted-foreground">
          Edita la información del préstamo.
        </p>
      </div>

      <section>
        <div>
          <Label htmlFor="client">Cliente</Label>
          {loan != null && (
            <Select
              defaultValue={defaultClientId}
              value={currentClientId}
              onValueChange={(value) => setCurrentClientId(value)}
            >
              <SelectTrigger className="w-[180px]">
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
      </section>
    </div>
  )
}
