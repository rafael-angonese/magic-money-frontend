import React, { ComponentPropsWithRef } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { tv, VariantProps } from 'tailwind-variants'

export const headingVariants = tv({
  base: '',
  variants: {
    color: {
      default: 'text-black dark:text-white',
      primary: 'text-purple-500 dark:text-purple-500',
      secondary: '',
      success: '',
      warning: '',
      error: '',
    },
    size: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'h1',
  },
})

type HeadingElement = React.ElementRef<'h1'>

type HeadingAsChildProps = {
  asChild?: boolean
  as?: never
}

type HeadingAsProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  asChild?: never
}

type HeadingProps = ComponentPropsWithRef<'h1'> &
  VariantProps<typeof headingVariants> &
  (HeadingAsChildProps | HeadingAsProps)

export const Heading = React.forwardRef<HeadingElement, HeadingProps>(
  (
    {
      children,
      className,
      asChild = false,
      as: Tag = 'h1',
      color,
      size,
      ...headingProps
    },
    forwardedRef,
  ) => {
    return (
      <Slot
        data-accent-color={color}
        {...headingProps}
        ref={forwardedRef}
        className={headingVariants({
          size: size || Tag,
          color,
          className,
        })}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    )
  },
)
Heading.displayName = 'Heading'
