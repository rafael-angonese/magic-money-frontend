import { ComponentProps, forwardRef } from 'react'

import { tv, VariantProps } from 'tailwind-variants'

export const inputVariants = tv({
  base: [
    'block w-full border border-muted text-sm rounded-lg',
    'px-3 py-1',
    'bg-transparent placeholder:text-muted-foreground',
    'focus:outline-muted focus:outline-1',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  variants: {
    size: {
      xs: 'p-2.5 text-base',
      sm: 'p-2.5 text-base',
      md: 'p-2.5 text-base',
      lg: 'p-2.5 text-base',
      xl: 'p-2.5 text-base',
    },
    isInvalid: {
      true: [
        'placeholder:text-error',
        'border-error hover:border-error text-error focus:outline-error',
        'dark:text-error dark:border-error dark:hover:border-error focus:dark:border-error dark:focus:outline-0',
      ],
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface InputProps
  extends Omit<ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  isInvalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isInvalid, size, className, ...props }, ref) => {
    return (
      <input
        className={inputVariants({
          isInvalid,
          size,
          className,
        })}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
