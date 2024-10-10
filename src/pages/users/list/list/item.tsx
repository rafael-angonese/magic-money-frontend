import React from 'react'

import { TableCell } from '@/components/ui/table/table-cell'
import { TableRow } from '@/components/ui/table/table-row'
import { User } from '@/types/user'
import formatDate from '@/utils/format-date'

export interface ItemProps {
  user: User
}

export const Item: React.FC<ItemProps> = ({ user }) => {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{user.id}</TableCell>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{formatDate(user.createdAt)}</TableCell>
        <TableCell className="flex gap-4" />
      </TableRow>
    </>
  )
}
