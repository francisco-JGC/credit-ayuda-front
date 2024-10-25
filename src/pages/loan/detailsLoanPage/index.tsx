import { LayuotPage } from "@/components/layuotPage";
import { getLoanById } from "@/services/loan";
import { ILoan } from "@/types/loans";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PreviewClientInfo } from "../createLoanPage/components/previewClientInfo";
import { LoanDetails } from "./components/loanDetail";
import { PaymentSchedule } from "./components/paymentSchedule";

export default function DetailsLoanPage() {
  const [loan, setLoan] = useState<ILoan>({} as ILoan)
  const params = useParams()

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
      <div className="flex flex-col gap-4">
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
      </div>
    </LayuotPage>
  )
}