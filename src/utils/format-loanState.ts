export const formatLoanStatus = (
  status: 'paid' | 'pending' | 'active' | 'unpaid',
): string => {
  const frequencyMap: Record<typeof status, string> = {
    paid: 'Pagado',
    pending: 'Pendiente',
    active: 'Activo',
    unpaid: 'No pagado',
  }

  return frequencyMap[status] || 'Sin prestamo'
}
