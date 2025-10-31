export function formatCurrency(v) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(v)
}
