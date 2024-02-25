import React, { ElementRef, forwardRef } from 'react'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { tv, VariantProps } from 'tailwind-variants'

export const dividerVariants = tv({
  base: 'shrink-0 bg-slate-200 dark:bg-slate-800',
  variants: {
    orientation: {
      vertical: 'h-full w-[4px]',
      horizontal: 'h-[4px] w-full',
    },
    color: {
      primary: 'bg-blue-500 dark:bg-blue-500',
      secondary: 'bg-purple-500 dark:bg-purple-500',
      success: 'bg-green-500 dark:bg-green-500',
      warning: 'bg-yellow-500 dark:bg-yellow-500',
      error: 'bg-red-500 dark:bg-red-500',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    orientation: 'horizontal',
    color: 'primary',
    size: 'md',
  },
})

type DividerVariants = VariantProps<typeof dividerVariants>

export interface DividerProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
      'color'
    >,
    DividerVariants {}

export const Divider = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  DividerProps
>(
  (
    {
      className,
      size,
      color,
      orientation = 'horizontal',
      decorative = true,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={dividerVariants({ orientation, size, color, className })}
      {...props}
    />
  ),
)
Divider.displayName = SeparatorPrimitive.Root.displayName
