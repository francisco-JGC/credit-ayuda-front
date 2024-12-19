import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAllowedAccess } from '@/hooks/use-allowed-access'
import { Navigate, Link } from 'react-router-dom'

export function NotAllowedPage() {
  const { allowed } = useAllowedAccess()

  if (allowed === true) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen grid place-content-center w-full">
      <Card>
        <CardHeader>
          <CardTitle>No tienes permiso de acceder al sistema</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>El sistema solo está disponible de 8 a.m. a 6 p.m</p>
          <p>
            Si crees que esto es un error, por favor contacta al administrador.
          </p>

          <Button className='mt-5'>
            <Link to={'/login'}>Ir a iniciar sesión</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
