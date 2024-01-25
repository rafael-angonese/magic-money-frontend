import isPresent from './is-present'

const onlyNumbers = (value: string): string => {
  let number = value

  if (typeof number === 'number') {
    return number
  } else if (isPresent(number)) {
    number = number.toString()
    number = number.replace(/[^\d]/g, '')
  } else if (!isPresent(number)) {
    number = ''
  }

  return number
}

export default onlyNumbers
