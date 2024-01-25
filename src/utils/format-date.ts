/* Examples

  formatDate(new Date())
  formatDate(new Date(), { dateStyle: 'long' })
  
*/

import isPresent from '@/utils/is-present'

const formatDate = (
  value?: string | Date | null,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
) => {
  if (value && isPresent(value)) {
    return new Date(value).toLocaleDateString('pt-br', options)
  } else {
    return ''
  }
}

export default formatDate
