import { useEffect, useState } from 'react'

import DEBOUNCE_DELAY from '@/constants/debounce-delay'

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value),
      delay || DEBOUNCE_DELAY,
    )

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
