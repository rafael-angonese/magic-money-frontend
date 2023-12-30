/* Examples
  maskDate(58088710)    => 58088-710
*/
import isPresent from '../isPresent'

const maskDate = (value?: string): string => {
  let masked = ''

  if (value && isPresent(value)) {
    masked = value.toString()
    masked = masked
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1')
  }

  return masked
}

export default maskDate
