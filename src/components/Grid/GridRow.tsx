import React, { ComponentProps } from 'react'

import { VariantProps, tv } from 'tailwind-variants'

export const gridVariants = tv({
  base: 'grid grid-cols-12 gap-4',
  variants: {},
})

export interface GridRowProps
  extends ComponentProps<'div'>,
    VariantProps<typeof gridVariants> {}

export const GridRow: React.FC<GridRowProps> = ({ className, ...props }) => {
  return <div className={gridVariants({ className })} {...props} />
}

GridRow.displayName = 'GridRow'
