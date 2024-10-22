export const formatDate = (date: string) => {
  const dateObj = new Date(date)

  if (isNaN(dateObj.getTime())) {
    return 'Fecha no válida'
  }

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  return dateObj.toLocaleDateString('es-ES', opciones).replace('.', '')
}
