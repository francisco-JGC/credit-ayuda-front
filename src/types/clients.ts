export interface IClientTable {
  id: number
  name: string
  phone: string
  address: string
  currentDebt: number
  route: string
  loanStatus: 'approved' | 'pending' | 'paid'
}

export interface ICreateClient {
  name: string
  dni: string
  primary_phone: string
  secondary_phone?: string
  primary_address: string
  secondary_address?: string
  business_type: string
  route_name: string
}
