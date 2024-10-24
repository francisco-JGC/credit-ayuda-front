export const formatLoanStatus = (
  status: 'paid' | 'pending' | 'active',
): string => {
  const frequencyMap: Record<typeof status, string> = {
    paid: 'Pagado',
    pending: 'Pendiente',
    active: 'Activo',
  }

  return frequencyMap[status] || 'Sin prestamo'
}
