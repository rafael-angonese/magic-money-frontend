import { useRef } from 'react'

import DEBOUNCE_DELAY from '@/constants/debounce-delay'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounceCallback = <T extends (...args: any) => any>(
  callback: T,
  delay?: number,
) => {
  const tmeoutRef = useRef<number | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function debouncedFn(...args: any) {
    if (tmeoutRef.current) {
      clearTimeout(tmeoutRef.current)
    }

    tmeoutRef.current = setTimeout(() => {
      // eslint-disable-next-line n/no-callback-literal
      callback(...args)
    }, delay || DEBOUNCE_DELAY)
  }

  return debouncedFn
}
