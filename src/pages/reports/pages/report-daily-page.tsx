import { LayuotPage } from "@/components/layuotPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForm from "@/hooks/useForm";
import { Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { Subject } from "../components/subject";
import { formatPrice } from "@/utils/price-format";
import { CreditTable } from "../components/creditTable";
import { useCredit } from "../hooks/useCredit";
import { useEffect } from "react";

export default function ReportDailyPage() {
  const { formValues, handleInputChange } = useForm({ filterDate: new Date().toISOString().split('T')[0] })
  const { credits, isLoading, error, refetch, summary } = useCredit({ filter_type: 'daily', date: formValues.filterDate })

  useEffect(() => { refetch() }, [formValues.filterDate])

  return (
    <LayuotPage title="Reporte Diario">
      <div className="flex flex-col gap-8 w-full">
        <div className="w-2/4">
          <label htmlFor="filterDate" className="font-semibold">Filtrar pagos diario por fecha</label>
          <div className="flex gap-4 items-center mt-4">
            <Input type="date" value={formValues.filterDate} id="filterDate" name="filterDate" onChange={handleInputChange} />
            <Link to={`#`}>
              <Button className="bg-indigo-500 flex gap-4">
                <Printer width={18} /> <span>IMPRIMIR</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded">
          <h3 className="font-bold text-lg">Abonos por ruta</h3>

          <div className="grid grid-cols-3 gap-4">
            <Subject title="Total de Abonos:" value={summary?.totalPayments.toString() || ''} />
            <Subject title="Pendientes:" value={summary?.totalPendingPayments.toString() || ''} />
            <Subject title="Monto Total a Cobrar:" value={formatPrice(summary?.totalAmountToCollect || 0).toString()} />
            <Subject title="Monto Total Cobrado:" value={formatPrice(summary?.totalAmountCollected || 0).toString()} />
            <Subject title="Monto Pendiente:" value={formatPrice(summary?.totalPendingAmount || 0).toString()} />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded">
          <h3 className="font-bold text-lg">Tabla de abonos por ruta</h3>

          <CreditTable data={credits as any} isLoading={isLoading} error={error} />
        </div>
      </div>
    </LayuotPage>
  )
}