import { useAllowedAccess } from '@/hooks/use-allowed-access'
import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Header } from '../header'

export function DashboardLayout() {
  const { allowed, isLoading, user } = useAllowedAccess()

  if (isLoading) {
    return (
      <div className="min-h-screen w-full grid place-content-center">
        Cargando...
      </div>
    )
  }

  if (user == null) {
    return <Navigate to="/login" />
  }

  if (allowed === false) {
    return <Navigate to="/unauthorized" />
  }

  return (
    <div className="mx-auto flex flex-col max-w-7xl items-center justify-between lg:px-8">
      <Header />
      <div className="w-full mt-6">
        <Outlet />
      </div>
      <Toaster />
    </div>
  )
}
