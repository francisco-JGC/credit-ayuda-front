import { Roles, User } from '@/types/user'
import { fetchData } from '@/utils/fetch-data'

export async function getUser(username: string) {
  const pathname = `/users/username/${username}`
  const response = await fetchData({
    url: pathname,
    method: 'GET',
    useToken: true,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data as User
}

export async function getRoles() {
  const pathname = '/role'
  const response = await fetchData({
    url: pathname,
    method: 'GET',
    useToken: true,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data as Roles[]
}

export async function updateUser(user: User) {
  const pathname = `/users/update/${user.id}`
  const response = await fetchData({
    url: pathname,
    method: 'POST',
    useToken: true,
    data: user,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data as User
}
