import { forwardRef, HTMLAttributes } from 'react'

import { tv } from 'tailwind-variants'

export const rowVariants = tv({
  base: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
})

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={rowVariants({ className })} {...props} />
))

TableRow.displayName = 'TableRow'
