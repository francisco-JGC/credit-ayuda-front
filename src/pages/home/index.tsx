import { Link } from 'react-router-dom'
import { MENU_ITEMS, MENU_ITEMS_SELLER } from './MENU_ITEMS'
import { useUserInfo } from '../profile/hooks/use-user-info'

export default function HomePage() {
  const { userInfo } = useUserInfo()

  const linkItems = userInfo?.roles.some((role) => role.name === 'admin')
    ? MENU_ITEMS
    : MENU_ITEMS_SELLER

  return (
    <div className="p-6 rounded flex items-center justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
        {linkItems.map((item, index) => {
          return (
            <Link
              to={item.path}
              className="p-4 shadow-lg rounded-lg hover:bg-gray-100 cursor-pointer flex flex-col gap-2 items-center"
              key={index}
            >
              <item.icon width={30} className="text-gray-800" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
