import isPresent from '@/utils/is-present'

const valueOrString = <T>(value?: T): T | string => {
  if (value && isPresent(value)) {
    return value
  } else {
    return ''
  }
}

export default valueOrString
