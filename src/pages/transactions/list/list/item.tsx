import React from 'react'

import { TableCell } from '@/components/ui/table/table-cell'
import { TableRow } from '@/components/ui/table/table-row'
import { ListTransaction } from '@/repositories/transactions/get-transactions'
import formatCurrency from '@/utils/format-currency'
import formatDate from '@/utils/format-date'

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
        <TableCell>{transaction?.bankAccount?.name}</TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell>{formatCurrency(transaction.amount)}</TableCell>
        <TableCell className="flex gap-4" />
      </TableRow>
    </>
  )
}
