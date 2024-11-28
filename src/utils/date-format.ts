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

export const formatDateLong = (date: string) => {
  const dateObj = new Date(date)

  if (isNaN(dateObj.getTime())) {
    return 'Fecha no válida'
  }

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const dateStr = dateObj.toLocaleDateString('es-ES', opciones).replace('.', '')
  const capitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
  return capitalized
}
