import React from 'react'

import { TableCell } from '@/components/ui/table/table-cell'
import { TableRow } from '@/components/ui/table/table-row'
import { BankAccount } from '@/types/bank-account'
import formatCurrency from '@/utils/format-currency'

import { Actions } from './actions'

export interface ItemProps {
  bankAccount: BankAccount
}

export const Item: React.FC<ItemProps> = ({ bankAccount }) => {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{bankAccount.name}</TableCell>
        <TableCell>{formatCurrency(bankAccount.balance)}</TableCell>
        <TableCell className="flex gap-4">
          <Actions bankAccount={bankAccount} />
        </TableCell>
      </TableRow>
    </>
  )
}
