import { IRoute } from './routes'

export type UserLoggedin = {
  username: string
  token: string
  role: string
}

export interface Roles {
  id: number
  name: string
  label: string
  description: string
  created_at: string
}

export type User = {
  id: number
  username: string
  roles: Roles[]
  route?: IRoute
  created_at: string
}
