import React, { ComponentProps } from 'react'

import { tv, VariantProps } from 'tailwind-variants'

export const skeletonVariants = tv({
  base: 'animate-pulse rounded-md bg-foreground',
})

export interface SkeletonProps
  extends ComponentProps<'div'>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return <div className={skeletonVariants({ className })} {...props} />
}

Skeleton.displayName = 'Skeleton'
