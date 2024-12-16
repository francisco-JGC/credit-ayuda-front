import { Card, CardContent } from '@/components/ui/card'
import { Register } from '@/types/registers'
import { formatPrice } from '@/utils/price-format'

export function GeneralCashDetails({
  lastRegister,
}: {
  lastRegister: Register
}) {
  return (
    <Card className="shadow-sm rounded-sm">
      <CardContent className="p-6">
        <div className="flex gap-x-8 text-lg font-medium">
          <p>Caja chica: {formatPrice(+(lastRegister.cash ?? 0))}</p>
          <p>Ahorro: {formatPrice(+(lastRegister.savings ?? 0))}</p>
        </div>
      </CardContent>
    </Card>
  )
}
