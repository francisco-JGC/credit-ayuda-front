export const formatFrequency = (
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly',
): string => {
  const frequencyMap: Record<typeof frequency, string> = {
    daily: 'Diario',
    weekly: 'Semanal',
    biweekly: 'Quincenal',
    monthly: 'Mensual',
    yearly: 'Anual',
  }

  return frequencyMap[frequency] || 'Sin frecuencia'
}
