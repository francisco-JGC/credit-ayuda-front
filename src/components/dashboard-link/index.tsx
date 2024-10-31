import { cn } from '@/lib/utils'
import { NavLink, type NavLinkProps } from 'react-router-dom'

export function DashBoardLink({ children, ...props }: NavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          `py-2 px-3.5 hover:bg-gray-200 rounded transition-colors bg-white font-semibold text-gray-900 ${
            isActive && 'bg-gray-200'
          }`,
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  )
}
