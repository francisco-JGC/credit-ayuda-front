import { User } from './user'

export type RegisterType = 'income' | 'withdraw' | 'loan' | 'savings' | 'cash'

export interface Register {
  id: number
  created_at: string
  amount: string
  cash?: string
  withdraw?: string
  savings?: string
  user: User
  type: RegisterType
  details?: string
}

export type CreateRegister = Omit<Register, 'id' | 'created_at'>
