import React from 'react'

import { tv } from 'tailwind-variants'

export const columnVariants = tv({
  base: 'h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400',
})

export const TableColumn = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={columnVariants({ className })} {...props} />
))
TableColumn.displayName = 'TableColumn'
