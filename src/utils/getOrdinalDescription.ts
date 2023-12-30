function getOrdinalDescription(number: number | undefined): string {
  if (typeof number === 'undefined' || number === null) {
    return ''
  }

  if (number === 0) {
    return 'zero'
  }

  const units = [
    'zero',
    'primeiro',
    'segundo',
    'terceiro',
    'quarto',
    'quinto',
    'sexto',
    'sétimo',
    'oitavo',
    'nono',
  ]
  const tens = [
    'zero',
    'décimo',
    'vigésimo',
    'trigésimo',
    'quadragésimo',
    'quinquagésimo',
    'sexagésimo',
    'septuagésimo',
    'octogésimo',
    'nonagésimo',
  ]
  const hundreds = [
    'zero',
    'centésimo',
    'ducentésimo',
    'trecentésimo',
    'quadringentésimo',
    'quingentésimo',
    'sexcentésimo',
    'septingentésimo',
    'octingentésimo',
    'nongentésimo',
  ]

  if (number >= 1 && number <= 9) {
    return units[number]
  } else if (number >= 10 && number <= 99) {
    const ten = Math.floor(number / 10)
    const unit = number % 10
    return tens[ten] + (unit !== 0 ? '-' + units[unit] : '')
  } else if (number >= 100 && number <= 999) {
    const hundred = Math.floor(number / 100)
    const remaining = number % 100
    return (
      hundreds[hundred] +
      (remaining !== 0 ? ' ' + getOrdinalDescription(remaining) : '')
    )
  }

  return number.toString() // For unsupported numbers (greater than 999)
}

export default getOrdinalDescription
