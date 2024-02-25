import { ReactNode } from 'react'

import { TableCell } from '@/components/ui/table/table-cell'
import { TableRow } from '@/components/ui/table/table-row'

interface TableEmptyProps {
  isEmpty?: boolean
  children?: ReactNode
}

export const TableEmpty: React.FC<TableEmptyProps> = ({
  isEmpty,
  children,
}) => {
  return (
    <>
      {isEmpty && (
        <TableRow>
          <TableCell align="center" colSpan={99}>
            {children || 'Sem dados'}
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

TableEmpty.displayName = 'TableEmpty'
