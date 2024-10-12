import { Link } from "react-router-dom"
import { MENU_ITEMS } from "./MENU_ITEMS"

export default function HomePage() {
  return (
    <div className="p-6 rounded flex items-center justify-center">
      <div className="grid grid-cols-3  gap-16">
        {
          MENU_ITEMS.map((item, index) => {
            return (<Link to={item.path} className="p-4 shadow-lg rounded-lg hover:bg-gray-100 cursor-pointer flex flex-col gap-2 items-center"
              key={index}>
              <item.icon width={30} className="text-gray-800" />
              <span>{item.label}</span>
            </Link>)
          })
        }
      </div>
    </div >
  )
}