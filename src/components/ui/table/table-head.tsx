import { forwardRef, HTMLAttributes } from 'react'

import { tv } from 'tailwind-variants'

export const headVariants = tv({
  base: 'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
})

export const TableHead = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={headVariants({ className })} {...props} />
))

TableHead.displayName = 'TableHead'
