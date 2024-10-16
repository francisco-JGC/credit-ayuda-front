import { ChevronLeft } from "lucide-react"
import { Button } from "../ui/button"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface IProps {
  children: ReactNode
  title: string
  description?: string
}

export const LayuotPage = ({ children, title, description }: IProps) => {
  const navigate = useNavigate()

  const handleClickNavigate = () => navigate(-1)

  return (
    <div className="flex flex-col gap-6 md:gap-8 text-sm md:text-base text-gray-700 p-4 md:p-6 lg:p-8">
      <header className="flex gap-2 md:gap-3 items-center">
        <Button className="p-2 md:p-3" onClick={handleClickNavigate}>
          <ChevronLeft width={18} />
        </Button>
        <span className="font-semibold text-base md:text-lg lg:text-xl flex flex-col gap-0">
          {title}

          <small className="text-gray-500 font-normal text-xs md:text-sm">
            {description}
          </small>
        </span>
      </header>
      <div className="flex flex-col gap-4 md:gap-6">
        {children}
      </div>
    </div>

  )
}