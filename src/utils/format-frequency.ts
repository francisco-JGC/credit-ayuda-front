export const formatFrequency = (
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly',
): string => {
  const frequencyMap: Record<typeof frequency, string> = {
    daily: 'Diaria',
    weekly: 'Semanal',
    biweekly: 'Quincenal',
    monthly: 'Mensual',
    yearly: 'Anual',
  }

  return frequencyMap[frequency] || 'Frecuencia no reconocida'
}
