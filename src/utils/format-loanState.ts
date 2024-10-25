export const formatLoanStatus = (
  status: 'paid' | 'pending' | 'active' | 'unpaid' | 'rejected',
): string => {
  const frequencyMap: Record<typeof status, string> = {
    paid: 'Pagado',
    pending: 'Pendiente',
    active: 'Activo',
    unpaid: 'No pagado',
    rejected: 'Rechazado',
  }

  return frequencyMap[status] || 'Sin prestamo'
}
