export const currencyFormatter = (value, currency) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: `${currency}` })
}