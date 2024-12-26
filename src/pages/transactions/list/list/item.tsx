import React from 'react'

import { tv } from 'tailwind-variants'

import { TableCell } from '@/components/ui/table/table-cell'
import { TableRow } from '@/components/ui/table/table-row'
import { ListTransaction } from '@/repositories/transactions/get-transactions'
import formatCurrency from '@/utils/format-currency'
import formatDate from '@/utils/format-date'

const table = tv({
  base: 'cursor-pointer',
  variants: {
    type: {
      CREDIT: 'text-green-400/90 hover:!text-green-400',
      DEBIT: 'text-red-400/90 hover:!text-red-400',
    },
  },
})

export interface ItemProps {
  transaction: ListTransaction
}

export const Item: React.FC<ItemProps> = ({ transaction }) => {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{transaction.id}</TableCell>
        <TableCell className="font-medium">
          {formatDate(transaction.date, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </TableCell>
        <TableCell>{transaction?.category?.name}</TableCell>
        <TableCell>{transaction?.sourceBankAccount?.name}</TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell
          className={table({
            type: transaction.type,
          })}
        >
          {formatCurrency(transaction.amount)}
        </TableCell>
        <TableCell className="flex gap-4" />
      </TableRow>
    </>
  )
}
