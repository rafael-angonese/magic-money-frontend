import isPresent from '@/utils/is-present'

const accentsTidy = (value?: string): string => {
  let masked = ''
  if (value && isPresent(value)) {
    masked = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  return masked
}

export default accentsTidy
