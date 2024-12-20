import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { User2Icon } from 'lucide-react'
import { useAuth } from '../protectedRoute/authProvider'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const UserMenu = ({ onClick }: { onClick?: () => void }) => {
  const { logout } = useAuth()

  return (
    <Menu as="div" className="relative">
      <MenuButton className="relative px-2  flex rounded-full">
        <User2Icon />
      </MenuButton>
      <MenuItems className="lg:absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <MenuItem>
          <Link
            to="/profile"
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Perfil
          </Link>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              logout()
              onClick?.()
            }}
            className="w-full text-start block px-4 py-2 text-gray-700 hover:bg-gray-100 bg-transparent border-none shadow-none"
          >
            Cerrar Sesión
          </Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
