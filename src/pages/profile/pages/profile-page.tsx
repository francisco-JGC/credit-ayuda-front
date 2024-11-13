import { UpdateProfileModal } from '../components/update-profile-modal'
import { useUserInfo } from '../hooks/use-user-info'

export function ProfilePage() {
  const { userInfo, refetch } = useUserInfo()
  const rolesNames = userInfo?.roles.map((role) => role.label).join(', ')

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

      <div className="border rounded p-6">
        <div className="flex flex-col gap-y-8">
          <div className="bg-neutral-100 px-3 py-2 rounded-lg">
            <p className="inline-flex flex-col">
              Usuario: <strong>@{userInfo?.username}</strong>
            </p>
          </div>
          <div className="bg-neutral-100 px-3 py-2 rounded-lg">
            <p className="inline-flex flex-col">
              Roles: <strong>{rolesNames}</strong>
            </p>
          </div>

          <div className="bg-neutral-100 px-3 py-2 rounded-lg">
            <p className="inline-flex flex-col">
              Ruta:{' '}
              <strong>{userInfo?.route?.name ?? 'No seleccionada'}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
