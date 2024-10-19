import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface IProps {
  search: {
    dni: string
  }
  handleInputChangeDni: (e: any) => void
  handleSearchClientDni: (e: any) => void
}

export const FormSearchClientByDni = ({ search, handleInputChangeDni, handleSearchClientDni }: IProps) => {
  return (
    <form className="flex gap-2  bg-gray-50 p-4 rounded-lg" onSubmit={handleSearchClientDni}>
      <Input value={search.dni} name="dni" onChange={handleInputChangeDni} placeholder="Cédula de Identidad del Cliente" required />
      <Button typeof='submit' className="bg-indigo-500 hover:bg-indigo-400"><Search width={17} /></Button>
    </form>
  )
}