import isPresent from '@/utils/is-present'

const valueOrNull = <T>(value?: T): T | null => {
  if (value && isPresent(value)) {
    return value
  } else {
    return null
  }
}

export default valueOrNull
