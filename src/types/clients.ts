import { IRoute } from './routes'

export interface IClientTable {
  id: number
  name: string
  phone: string
  address: string
  current_debt: number
  dni: string
  route: string
  loan_status: 'approved' | 'pending' | 'paid'
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

export interface IClient {
  id: number
  name: string
  dni: string
  primary_phone: string
  secondary_phone?: string
  primary_address: string
  secondary_address?: string
  business_type: string
  route?: IRoute
}
