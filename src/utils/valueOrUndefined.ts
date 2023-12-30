import isDefined from '@/utils/isDefined'
import isPresent from '@/utils/isPresent'

const valueOrUndefined = <T>(value?: T): T | undefined => {
  if (isDefined(value) && isPresent(value)) {
    return value
  } else {
    return undefined
  }
}

export default valueOrUndefined
