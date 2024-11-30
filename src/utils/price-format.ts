export const formatPrice = (price: number) => {
  if (price == null) return price

  return price.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })
}
