import { ComponentProps, forwardRef } from 'react'
import { cnBase } from 'tailwind-variants'

export interface InputRightElementProps extends ComponentProps<'div'> {}

export const InputRightElement = forwardRef<
  HTMLInputElement,
  InputRightElementProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cnBase(
        'absolute right-2 top-1/2 transform -translate-y-1/2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

InputRightElement.displayName = 'InputRightElement'
