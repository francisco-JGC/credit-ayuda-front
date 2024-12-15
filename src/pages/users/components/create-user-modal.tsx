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
  SelectValue,
} from '@/components/ui/select'
import MultipleSelector from '@/components/ui/select-multiple'
import { useLoanRoutes } from '@/hooks/use-loan-routes'
import { useUserRoles } from '@/pages/profile/hooks/use-user-roles'
import { Roles, UserCreate } from '@/types/user'
import { useState } from 'react'
import { toast } from 'sonner'
import { useCreateUser } from '../hooks/use-users'

export function CreateUserModal() {
  const [open, setOpen] = useState(false)
  const { create } = useCreateUser()
  const { roles } = useUserRoles()
  const defaultOptions =
    roles?.map((role) => ({
      label: role.label,
      value: role.id.toString(),
    })) ?? []

  const [options, setOptions] = useState(defaultOptions)
  const { data: routes, isLoading } = useLoanRoutes()
  const [selectedRoute, setSelectedRoute] = useState<string | undefined>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string
    const route = routes?.find((route) => route.id.toString() === selectedRoute)
    const userRoles = options
      .map((option) =>
        roles?.find((role) => role.id.toString() === option.value),
      )
      .filter(Boolean) as Roles[]

    if (username.length === 0) {
      toast.error('El usuario no puede estar vacío')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if ((userRoles?.length ?? 0) === 0) {
      toast.error('Debes seleccionar al menos un rol')
      return
    }

    const newUser: UserCreate = {
      username,
      password,
      roles: userRoles,
      route,
    }

    create(newUser)
      .then(() => {
        toast.success('Usuario creado correctamente')
        setOpen(false)
      })
      .catch(() => {
        toast.error('Error al crear el usuario')
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Registrar usuario</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo usuario</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">
                Usuario <span className="text-red-500">*</span>
              </Label>
              <Input id="username" name="username" placeholder="mi_usuario" />
            </div>
            <div>
              <Label htmlFor="password">
                Contraseña <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="*********"
                type="password"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">
                Confirmar contraseña <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                placeholder="*********"
                type="password"
              />
            </div>
            <div>
              <Label htmlFor="roles">
                Roles <span className="text-red-500">*</span>
              </Label>
              <MultipleSelector
                defaultOptions={defaultOptions}
                onChange={setOptions}
                value={options}
              />
            </div>
            <div>
              <Label htmlFor="route">Ruta</Label>
              {!isLoading && (
                <Select
                  name="route"
                  value={selectedRoute}
                  onValueChange={setSelectedRoute}
                >
                  <SelectTrigger>
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
              <Button type="submit">Registrar</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
