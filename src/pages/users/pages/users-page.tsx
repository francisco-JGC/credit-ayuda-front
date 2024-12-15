import { CreateUserModal } from '../components/create-user-modal'
import { UsersTable } from '../components/users-table'
import { useUsers } from '../hooks/use-users'

export function UsersPage() {
  const { users } = useUsers()

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-6">
          <h2 className="text-2xl font-medium">Usuarios</h2>
          <p className="text-sm text-muted-foreground">
            Listado de los usuarios del sistema.
          </p>
        </div>
        <div>
          <CreateUserModal />
        </div>
      </div>

      <div>
        <UsersTable users={users ?? []} />
      </div>
    </div>
  )
}
