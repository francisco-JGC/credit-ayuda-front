import { useAuth } from '@/components/protectedRoute/authProvider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import MultipleSelector from '@/components/ui/select-multiple'
import { useLoanRoutes } from '@/hooks/use-loan-routes'
import { User } from '@/types/user'
import { SelectValue } from '@radix-ui/react-select'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useUpdateUser } from '../hooks/use-update-user'
import { useUserRoles } from '../hooks/use-user-roles'

interface UpdateProfileModalProps {
  user: User
  onUpdate: () => void
}

export function UpdateProfileModal({
  user,
  onUpdate,
}: UpdateProfileModalProps) {
  const { updateUser: updateUserContext, user: userContext } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { roles } = useUserRoles()
  const { data: routes, isLoading } = useLoanRoutes()
  const [options, setOptions] = useState(
    user.roles.map((role) => ({
      label: role.label,
      value: role.id.toString(),
    })),
  )
  const [selectedRoute, setSelectedRoute] = useState(user.route?.id.toString())
  const [username, setUsername] = useState(user.username)
  const { isPending, updateUser } = useUpdateUser()
  const defaultOptions =
    roles?.map((role) => ({
      label: role.label,
      value: role.id.toString(),
    })) ?? []

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    setOptions(
      user.roles.map((role) => ({
        label: role.label,
        value: role.id.toString(),
      })),
    )
  }, [isModalOpen, setOptions, user.roles])

  const handleUpdateUser = () => {
    if (roles == null || routes == null) {
      return
    }

    const newRoles = options
      .map((option) => {
        return roles?.find((role) => role.id === +option.value)
      })
      .filter((role) => role != null)

    const newRoute = routes?.find(
      (route) => route.id.toString() === selectedRoute,
    )

    const updatedUser: User = {
      ...user,
      username,
      roles: newRoles,
      route: newRoute,
    }
    updateUser(updatedUser)
      .then(() => {
        updateUserContext(userContext && { ...userContext, username })
        toast.success('Usuario actualizado correctamente')
        onUpdate()
      })
      .catch(() => {
        toast.error('Ocurrió un error al actualizar el usuario')
      })
      .finally(() => {
        setIsModalOpen(false)
      })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>Editar perfil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="roles">Roles</Label>
            <MultipleSelector
              defaultOptions={defaultOptions}
              onChange={setOptions}
              value={options}
            />
          </div>

          <div>
            <Label htmlFor="route">Ruta</Label>
            {!isLoading && (
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger name="route" id="route">
                  <SelectValue placeholder="Selecciona una ruta"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {routes?.map((route) => (
                    <SelectItem key={route.name} value={route.id.toString()}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleUpdateUser}>
              {isPending ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
