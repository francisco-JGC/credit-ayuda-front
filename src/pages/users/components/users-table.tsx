import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { User } from '@/types/user'
import { UpdateUserModal } from './update-user-modal'
import { useAuth } from '@/components/protectedRoute/authProvider'

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  const { user: currentUser } = useAuth()
  const usersWithouthCurrentUser = users.filter(
    (user) => user.username !== currentUser?.username,
  )

  return (
    <Table>
      <TableHeader>
        <TableRow className="[&>th]:px-4 [&>th]:text-xs [&>th]:sticky [&>th]:z-10 [&>th]:top-0">
          <TableHead>ID</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Ruta</TableHead>
          <TableHead>Fecha de creación</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersWithouthCurrentUser.map((user) => (
          <TableRow key={user.id} className="[&>td]:px-4">
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>
              {user.roles.map((role) => role.label).join(', ')}
            </TableCell>
            <TableCell>{user.route?.name ?? 'No seleccionada'}</TableCell>
            <TableCell>
              {new Date(user.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <UpdateUserModal user={user} />
              </div>
            </TableCell>
          </TableRow>
        ))}
        {usersWithouthCurrentUser.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No hay usuarios registrados.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
