import { IClient } from './clients'

export interface ILoanTable {
  id: number
  client_name: string
  dni: string
  amount: number
  remaining_debt: number
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'
  route: string
  status: 'active' | 'paid' | 'pending'
}

export type LoanFreuqency =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'yearly'

export type LoanStatus = 'active' | 'paid' | 'pending' | 'rejected'

export interface ICreateLoan {
  client_id: number
  amount: number
  loan_date: string
  interest_rate: number
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'
  total_payments: number
  payment_amount: number
  total_recovered: number

  payment_schedule?: ICreatePaymentSchedule[]
}

export interface ILoan {
  id: number
  amount: number
  loan_date: string
  interest_rate: number
  total_recovered: number
  total_pending: number
  status: 'active' | 'paid' | 'pending' | 'rejected'
  client: IClient
  payment_plan: IPaymentPlan
  penalty_plan?: IPenaltyPlan
  created_at: string
}

export interface IPaymentPlan {
  id: number
  total_payments: number
  payments_remaining: number
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'
  payment_amount: number
  loan: ILoan
  payment_schedules: IPaymentSchedule[]
}

export type PaymentStatus = 'paid' | 'pending' | 'late'

export interface IPaymentSchedule {
  id: number
  due_date: string
  paid_date?: string
  amount_due: string
  amount_paid: string
  status: PaymentStatus
  loan_id: number
}

export interface ICreatePaymentSchedule {
  due_date: string
  amount_due: number
  amount_paid: number
  status: PaymentStatus
}

export type PenaltyStatus = 'paid' | 'unpaid' | 'pending'

export interface IPenaltyPlan {
  id: number
  total_penalty_amount: number
  current_penalty_amount: number
  interest_rate: number
  status: PenaltyStatus
  penalty_payment_schedules: IPenaltyPaymentSchedule[]
  loan: ILoan
  created_at: string
}

export type ICreatePenaltyPlan = Omit<IPenaltyPlan, 'id' | 'created_at'>

export interface IPenaltyPaymentSchedule {
  id: number
  dueDate: string
  amount_due: number
  amount_paid: number
  status: PenaltyStatus
}

export type IPenaltyPaymentScheduleCreate = Omit<IPenaltyPaymentSchedule, 'id'>

export interface IPaymentScheduleDetails {
  id: number
  due_date: string
  amount_due: number
  amount_paid: number
  status: PaymentStatus
  payment_plan: IPaymentPlan
}
