import { fetchData } from '@/utils/fetch-data'

interface AccessResponse {
  allowed: boolean
}

export async function isAllowedAccess(username: string) {
  return (await fetchData({
    url: `/access/${username}`,
    method: 'GET',
  })) as unknown as AccessResponse
}
