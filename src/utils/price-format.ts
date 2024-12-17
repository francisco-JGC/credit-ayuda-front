export const formatPrice = (price: number | string) => {
  if (price == null) return price
  price = Number(price)

  return price.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })
}
