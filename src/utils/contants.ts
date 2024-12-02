import { LoanFrequency } from '@/pages/loan/hooks/use-loan-filters'
import { LoanStatus, PaymentStatus, PenaltyStatus } from '@/types/loans'

export const frequencies: LoanFrequency[] = [
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'yearly',
] as const

export const frequencyMap: Record<LoanFrequency, string> = {
  daily: 'Diario',
  weekly: 'Semanal',
  biweekly: 'Quincenal',
  monthly: 'Mensual',
  yearly: 'Anual',
}

export const loanStatus: LoanStatus[] = [
  'active',
  'pending',
  'paid',
  'rejected',
] as const

export const statusMap: Record<LoanStatus, string> = {
  active: 'Activo',
  pending: 'Pendiente',
  paid: 'Pagado',
  rejected: 'Rechazado',
}

export const paymentStatusMap: Record<PaymentStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  late: 'Atrasado',
}

export const penaltyStatus: PenaltyStatus[] = [
  'pending',
  'paid',
  'unpaid',
] as const

export const penaltyStatusMap: Record<PenaltyStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  unpaid: 'No pagado',
}
