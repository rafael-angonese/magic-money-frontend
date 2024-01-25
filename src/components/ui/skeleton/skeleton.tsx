import React, { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

export const skeletonVariants = tv({
  base: 'animate-pulse rounded-md bg-slate-100 dark:bg-slate-800',
})

export interface SkeletonProps
  extends ComponentProps<'div'>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return <div className={skeletonVariants({ className })} {...props} />
}

Skeleton.displayName = 'Skeleton'
