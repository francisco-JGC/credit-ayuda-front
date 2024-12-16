import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { DashBoardLink } from '../dashboard-link'
import { reports } from './data'
import { useUserInfo } from '@/pages/profile/hooks/use-user-info'
import { hasRole } from '@/utils/roles'

export const DesktopNav = () => {
  const { userInfo } = useUserInfo()

  return (
    <Popover className="hidden lg:flex lg:gap-x-4">
      <DashBoardLink to="/">Inicio</DashBoardLink>
      <DashBoardLink to="/loans">Préstamos</DashBoardLink>
      {hasRole('admin', userInfo) && (
        <DashBoardLink to="/clients">Clientes</DashBoardLink>
      )}
      {hasRole('admin', userInfo) && (
        <DashBoardLink to="/routes">Rutas</DashBoardLink>
      )}
      {hasRole('admin', userInfo) && (
        <Popover className="relative">
          <PopoverButton className="inline-flex items-center justify-between gap-1 py-2 px-3.5 hover:bg-gray-200 rounded transition-colors bg-white font-semibold text-gray-900">
            Informes
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PopoverButton>
          <PopoverPanel className="absolute z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {reports.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-center gap-x-6 p-4 hover:bg-gray-50"
                >
                  <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                  <div className="flex-auto">
                    <Link
                      to={item.href}
                      className="block font-semibold text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </PopoverPanel>
        </Popover>
      )}
      {hasRole('admin', userInfo) && (
        <DashBoardLink to="/requests">Solicitudes</DashBoardLink>
      )}
    </Popover>
  )
}
