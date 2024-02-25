import { forwardRef } from 'react'

import { Root } from '@radix-ui/react-avatar'
import { tv, VariantProps } from 'tailwind-variants'

export const rootVariants = tv({
  base: 'relative flex shrink-0 overflow-hidden',
  variants: {
    color: {
      primary: 'ring-blue-500',
      secondary: 'ring-purple-500',
      success: 'ring-green-500',
      warning: 'ring-yellow-500',
      error: 'ring-red-500',
    },
    size: {
      xs: 'h-10 w-10',
      sm: 'h-12 w-12',
      md: 'h-14 w-14',
      lg: 'h-16 w-16',
      xl: 'h-20 w-20',
    },
    isBordered: {
      true: 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      rounded: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    color: 'primary',
    size: 'md',
    rounded: 'full',
  },
})

export interface AvatarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Root>, 'color'>,
    VariantProps<typeof rootVariants> {}

export const AvatarRoot = forwardRef<
  React.ElementRef<typeof Root>,
  AvatarProps
>(({ color, size, isBordered, rounded, className, ...props }, ref) => (
  <Root
    ref={ref}
    className={rootVariants({
      color,
      rounded,
      size,
      isBordered,
      className,
    })}
    {...props}
  />
))

AvatarRoot.displayName = Root.displayName
