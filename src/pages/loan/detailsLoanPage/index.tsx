import { LayuotPage } from "@/components/layuotPage";
import { getLoanById } from "@/services/loan";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DetailsLoanPage() {

  const params = useParams()

  useEffect(() => {
    getLoanById(Number(params.id))
      .then((response) => {
        if (response.success) {
          console.log(response.data)
        }
      })
  }, [params.id])

  return (
    <LayuotPage title="Detalles del prestamo" description="">
      <div className="flex flex-col gap-6">

      </div>
    </LayuotPage>
  )
}