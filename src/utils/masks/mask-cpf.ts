/* Examples
  maskCpf(11122233344)    => 111.222.333-44
*/
import isPresent from '../is-present'

const maskCpf = (value?: string): string => {
  let masked = ''

  if (value && isPresent(value)) {
    masked = value.toString()
    masked = masked
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  return masked
}

export default maskCpf
