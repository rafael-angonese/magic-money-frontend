/* Examples
  maskCep(58088710)    => 58088-710
*/
import isPresent from '../isPresent'

const maskCep = (value?: string): string => {
  let masked = ''

  if (value && isPresent(value)) {
    masked = value.toString()
    masked = masked
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  return masked
}

export default maskCep
