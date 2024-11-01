import { LoanFrequency } from '@/pages/loan/hooks/use-loan-filters'

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

export const loanStatus = ['active', 'pending', 'paid'] as const

export const statusMap: Record<string, string> = {
  active: 'Activo',
  pending: 'Pendiente',
  paid: 'Pagado',
}
