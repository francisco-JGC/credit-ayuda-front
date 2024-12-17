import { CreateRegister, Register } from '@/types/registers'
import { fetchData } from '@/utils/fetch-data'

export async function getAllRegisters() {
  const url = '/registers'

  const response = await fetchData<Register[]>({
    url,
    method: 'GET',
    useToken: true,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data
}

export async function createRegister(register: CreateRegister) {
  const url = '/registers/create'

  const response = await fetchData<Register>({
    url,
    method: 'POST',
    useToken: true,
    data: register,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data
}

export async function updateRegister(register: Register) {
  const url = `/registers/update`

  const response = await fetchData<Register>({
    url,
    method: 'POST',
    useToken: true,
    data: register,
  })

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data
}
