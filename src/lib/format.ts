const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** 55 → «55 €» */
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}
