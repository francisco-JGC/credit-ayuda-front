import {
  MapPinIcon,
  ArrowTrendingUpIcon,
  UserPlusIcon,
  BanknotesIcon,
  UsersIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'

export const MENU_ITEMS = [
  {
    path: '#',
    label: 'Mi Ruta',
    icon: MapPinIcon,
  },
  {
    path: '/loans',
    label: 'Préstamos',
    icon: BanknotesIcon,
  },
  {
    path: '#',
    label: 'Solicitudes',
    icon: UserPlusIcon,
  },
  {
    path: '/clients',
    label: 'Clientes',
    icon: UserGroupIcon,
  },
  {
    path: '/routes',
    label: 'Rutas',
    icon: ArrowTrendingUpIcon,
  },
  {
    path: '#',
    label: 'Usuarios',
    icon: UsersIcon,
  },
]
