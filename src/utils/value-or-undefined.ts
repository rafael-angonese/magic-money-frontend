import isDefined from '@/utils/is-defined'
import isPresent from '@/utils/is-present'

const valueOrUndefined = <T>(value?: T): T | undefined => {
  if (isDefined(value) && isPresent(value)) {
    return value
  } else {
    return undefined
  }
}

export default valueOrUndefined
