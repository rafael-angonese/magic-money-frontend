import React from 'react'

import { Table } from '@/components/ui/table/table'
import { TableBody } from '@/components/ui/table/table-body'
import { TableEmpty } from '@/components/ui/table/table-empty'
import { TableHead } from '@/components/ui/table/table-head'
import { TableHeader } from '@/components/ui/table/table-header'
import { TableRow } from '@/components/ui/table/table-row'
import { useListDocuments } from '@/pages/documents/list/hooks/use-list-documents'
import isBlank from '@/utils/is-blank'

import { Item } from './item'

export const List: React.FC = () => {
  const { data } = useListDocuments()

  const documents = data?.data?.data ?? []

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty isEmpty={isBlank(documents)} />
            {documents.map((document) => (
              <Item key={document.id} document={document} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
