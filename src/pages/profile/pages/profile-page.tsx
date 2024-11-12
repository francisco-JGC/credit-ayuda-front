import { UpdateProfileModal } from '../components/update-profile-modal'
import { useUserInfo } from '../hooks/use-user-info'

export function ProfilePage() {
  const { userInfo, refetch } = useUserInfo()
  const rolesNames = userInfo?.roles.map((role) => role.name).join(', ')

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-6">
          <h2 className="text-2xl font-medium">Bienvenido a tu perfil</h2>
        </div>
        <div>
          {userInfo != null && (
            <UpdateProfileModal user={userInfo} onUpdate={refetch} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div>
          <p>Usuario: @{userInfo?.username}.</p>
        </div>
        <div>
          <p>Roles: {rolesNames}.</p>
        </div>
        <div>
          <p>Ruta: {userInfo?.route?.name ?? 'No seleccionada'}.</p>
        </div>
      </div>
    </div>
  )
}
