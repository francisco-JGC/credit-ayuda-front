import { User } from '@/types/user'

export function hasRole(rolename: string, user?: User) {
  return user?.roles.some((role) => role.name === rolename)
}
