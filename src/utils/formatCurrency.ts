/* Examples
const price = 100

formatCurrency(price)

formatCurrency(price, {
  currencyDisplay: 'none',
})

*/

import isDefined from '@/utils/isDefined'

const formatCurrency = (
  value?: number | string,
  opts: {
    locale?: string
    currency?: string
    style?: string
    currencyDisplay?: string
  } = {},
) => {
  const { locale = 'pt-br', currency = 'BRL', style = 'currency' } = opts
  const stripSymbols = opts.currencyDisplay === 'none'
  if (!isDefined(value)) {
    return ''
  }

  let result = new Intl.NumberFormat(locale, {
    currency,
    style,
    maximumFractionDigits: 2,
  }).format(Number(value))

  if (stripSymbols) {
    result = result.split('$')[1].trim()
  }

  return result
}

export default formatCurrency
