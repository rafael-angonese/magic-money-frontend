import { ComponentProps, forwardRef } from 'react'
import { cnBase } from 'tailwind-variants'

export interface InputLeftElementProps extends ComponentProps<'div'> {}

export const InputLeftElement = forwardRef<
  HTMLInputElement,
  InputLeftElementProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cnBase(
        'absolute left-2 top-1/2 transform -translate-y-1/2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

InputLeftElement.displayName = 'InputLeftElement'
