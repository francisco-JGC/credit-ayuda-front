import { LoanFrequency } from '@/hooks/use-loan-filters'

export const frequencies: LoanFrequency[] = [
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'yearly',
]

export const frequencyMap: Record<LoanFrequency, string> = {
  daily: 'Diario',
  weekly: 'Semanal',
  biweekly: 'Quincenal',
  monthly: 'Mensual',
  yearly: 'Anual',
}
