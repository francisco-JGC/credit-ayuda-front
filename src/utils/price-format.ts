export const formatPrice = (price: number) => {
  if (!price) return price;

  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
