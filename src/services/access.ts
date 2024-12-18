import { fetchData } from '@/utils/fetch-data'

interface AccessResponse {
  allowed: boolean
}

export async function isAllowedAccess(username: string) {
  const response = (await fetchData({
    url: `/access/${username}`,
    method: 'GET',
    useToken: true,
  })) as unknown as AccessResponse

  return response.allowed
}
