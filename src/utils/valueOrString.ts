import isPresent from '@/utils/isPresent'

const valueOrString = <T>(value?: T): T | string => {
  if (value && isPresent(value)) {
    return value
  } else {
    return ''
  }
}

export default valueOrString
