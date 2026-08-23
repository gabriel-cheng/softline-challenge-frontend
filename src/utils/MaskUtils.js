export function documentMask(document) {
  document = document.replace(/\D/g, '')
  if (document.length <= 11) {
    document = document.replace(/(\d{3})(\d)/, '$1.$2')
    document = document.replace(/(\d{3})(\d)/, '$1.$2')
    document = document.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    document = document.substring(0, 14)
    document = document.replace(/^(\d{2})(\d)/, '$1.$2')
    document = document.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    document = document.replace(/\.(\d{3})(\d)/, '.$1/$2')
    document = document.replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  }
  return document
}

export function currencyMask(value) {
  if (value === null || value === undefined) return ''
  value = String(value)

  let digits = value.replace(/\D/g, '')
  digits = digits.padStart(3, '0')

  const cents = digits.slice(-2)
  const integer = digits.slice(0, -2).replace(/^0+(?=\d)/, '')
  const integerFormatted = integer.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  return `R$ ${integerFormatted},${cents}`
}

export function unmaskCurrency(masked) {
  if (!masked) return ''
  const digits = masked.replace(/\D/g, '')
  const cents = digits.slice(-2).padStart(2, '0')
  const integer = digits.slice(0, -2) || '0'
  return `${integer}.${cents}`
}

export function formatCurrencyDisplay(value) {
  const number = Number(value) || 0
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function decimalMask(value, decimals = 3) {
  if (value === null || value === undefined) return ''
  value = String(value)

  let digits = value.replace(/\D/g, '')
  digits = digits.padStart(decimals + 1, '0')

  const fraction = digits.slice(-decimals)
  const integer = digits.slice(0, -decimals).replace(/^0+(?=\d)/, '')
  const integerFormatted = integer.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  return `${integerFormatted},${fraction}`
}

export function unmaskDecimal(masked, decimals = 3) {
  if (!masked) return ''
  const digits = masked.replace(/\D/g, '')
  const fraction = digits.slice(-decimals).padStart(decimals, '0')
  const integer = digits.slice(0, -decimals) || '0'
  return `${integer}.${fraction}`
}

export function weightMask(value) {
  return decimalMask(value, 3)
}

export function unmaskWeight(masked) {
  return unmaskDecimal(masked, 3)
}

export function formatWeightDisplay(value) {
  const number = Number(value) || 0
  return number.toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
}