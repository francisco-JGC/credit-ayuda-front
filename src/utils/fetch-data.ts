import Cookies from 'js-cookie'

interface FetchDataParams<T> {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: T
  useToken?: boolean
}

export interface IHandleResponse<T = unknown> {
  message?: string
  data?: T
  success: boolean
}

export interface IPagination {
  filter?: string
  page: number
  limit: number
}

export interface IPaginationResponse<T = unknown> {
  page: number
  limit: number
  data?: T
  total_data: number
  total_page: number
}

export async function fetchData<TData>({
  url,
  method,
  data,
  useToken = false,
}: FetchDataParams<TData>): Promise<IHandleResponse<TData>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (useToken) {
    const token = Cookies.get('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      throw new Error('Token no encontrado')
    }
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (method !== 'GET' && data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${url}`,
      options,
    )

    return await response.json()
  } catch (error: any) {
    console.error('Error en la solicitud:', error.message)
    throw error
  }
}
