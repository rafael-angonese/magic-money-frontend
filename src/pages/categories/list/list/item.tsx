import React from 'react'

import { TableCell } from '@/components/ui/table/table-cell'
import { TableRow } from '@/components/ui/table/table-row'
import { categoryTypeTranslations } from '@/constants/category-type'
import { Category } from '@/types/category'

export interface ItemProps {
  category: Category
}

export const Item: React.FC<ItemProps> = ({ category }) => {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{category.id}</TableCell>
        <TableCell className="font-medium">{category.name}</TableCell>
        <TableCell>{categoryTypeTranslations[category.type]}</TableCell>
        <TableCell className="flex gap-4" />
      </TableRow>
    </>
  )
}
