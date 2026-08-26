function onlyDigits(value) {
  return String(value ?? '').replace(/\D/g, '')
}

function isAllSameDigit(digits) {
  return /^(\d)\1+$/.test(digits)
}

export function isValidCPF(value) {
  const cpf = onlyDigits(value)
  if (cpf.length !== 11 || isAllSameDigit(cpf)) return false

  const calcCheckDigit = (base) => {
    let sum = 0
    let weight = base.length + 1
    for (const digit of base) {
      sum += Number(digit) * weight
      weight -= 1
    }
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const base = cpf.slice(0, 9)
  const digit1 = calcCheckDigit(base)
  const digit2 = calcCheckDigit(base + digit1)

  return cpf === base + String(digit1) + String(digit2)
}

export function isValidCNPJ(value) {
  const cnpj = onlyDigits(value)
  if (cnpj.length !== 14 || isAllSameDigit(cnpj)) return false

  const calcCheckDigit = (base) => {
    const weights = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    const sum = base
      .split('')
      .reduce((acc, digit, index) => acc + Number(digit) * weights[index], 0)

    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const base = cnpj.slice(0, 12)
  const digit1 = calcCheckDigit(base)
  const digit2 = calcCheckDigit(base + digit1)

  return cnpj === base + String(digit1) + String(digit2)
}

export function isValidDocument(value) {
  const digits = onlyDigits(value)
  if (digits.length === 11) return isValidCPF(digits)
  if (digits.length === 14) return isValidCNPJ(digits)
  return false
}