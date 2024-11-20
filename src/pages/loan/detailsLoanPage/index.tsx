import { LayuotPage } from "@/components/layuotPage";
import { getLoanById } from "@/services/loan";
import { ILoan } from "@/types/loans";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PreviewClientInfo } from "../createLoanPage/components/previewClientInfo";
import { LoanDetails } from "./components/loanDetail";
import { PaymentSchedule } from "./components/paymentSchedule";
import { AlertDialogModal } from "@/components/alertDialogModal";
import { Button } from "@/components/ui/button";
import { useUpdateLoan } from "@/pages/requests/hooks/use-update-loan";
import { toast } from "sonner";

export default function DetailsLoanPage() {
  const [loan, setLoan] = useState<ILoan>({} as ILoan)
  const params = useParams()
  const { update } = useUpdateLoan()

  const handleAcceptRequest = async () => {
    update({
      ...loan,
      status: 'active',
    })
      .then(() => {
        toast.success('Solicitud aceptada correctamente')
      })
      .catch(() => {
        toast.error('Ocurrió un error al aceptar la solicitud')
      })
  }

  useEffect(() => {
    getLoanById(Number(params.id))
      .then((response) => {
        if (response.success) {
          setLoan(response.data as ILoan)
        }
      })
  }, [params.id])

  return (
    <LayuotPage title="Detalles del prestamo" description="">
      <div className="flex flex-col gap-8">
        <PreviewClientInfo client={{
          ...loan.client,
          route_name: loan?.client?.route?.name || ''
        }}
          isLoading={false}
        />

        <LoanDetails
          frequency={loan?.payment_plan?.frequency}
          amount={loan?.amount}
          total_recovered={loan?.total_recovered}
          interest_rate={loan?.interest_rate}
          loan_date={loan?.loan_date}
          created_at={loan.created_at}
        />

        <PaymentSchedule payment_plan={loan?.payment_plan} />

        {
          loan.status === 'pending' && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <AlertDialogModal
                  title="Estas seguro de aceptar la solicitud de este prestamo?"
                  onConfirm={handleAcceptRequest}
                >
                  <Button className="bg-indigo-500 hover:bg-indigo-400">
                    Aceptar solicitud
                  </Button>
                </AlertDialogModal>

                {/* <Link to={`/loans/update/${loan.id}`}>
              <Button variant={'link'} className="text-blue-500">
                Modificar solicitud
              </Button>
            </Link> */}
              </div>

              <div>
                <AlertDialogModal
                  title="Al eliminar esta solicitud se borraran todos los registros previo de esta misma"
                  onConfirm={() => { }}
                >
                  <Button className="bg-red-400">
                    Rechazar solicitud
                  </Button>
                </AlertDialogModal>
              </div>
            </div>
          )
        }
      </div>
    </LayuotPage>
  )
}