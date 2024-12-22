import React from 'react'

import { TableCell } from '@/components/ui/table/table-cell'
import { TableRow } from '@/components/ui/table/table-row'
import { documentTypeTranslations } from '@/constants/document-type'
import { Document } from '@/types/document'
import formatDate from '@/utils/format-date'

import { Actions } from './actions'

export interface ItemProps {
  document: Document
}

export const Item: React.FC<ItemProps> = ({ document }) => {
  return (
    <>
      <TableRow>
        <TableCell>{document.id}</TableCell>
        <TableCell>{formatDate(document.date)}</TableCell>
        <TableCell>{documentTypeTranslations[document.documentType]}</TableCell>
        <TableCell className="flex gap-4">
          <Actions document={document} />
        </TableCell>
      </TableRow>
    </>
  )
}
