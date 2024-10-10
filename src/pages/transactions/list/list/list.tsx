import React from 'react'

import { Table } from '@/components/ui/table/table'
import { TableBody } from '@/components/ui/table/table-body'
import { TableEmpty } from '@/components/ui/table/table-empty'
import { TableHead } from '@/components/ui/table/table-head'
import { TableHeader } from '@/components/ui/table/table-header'
import { TableRow } from '@/components/ui/table/table-row'
import { useListTransactions } from '@/pages/transactions/list/hooks/use-list-transactions'
import isBlank from '@/utils/is-blank'

import { Item } from './item'

export const List: React.FC = () => {
  const { data } = useListTransactions()

  const transactions = data?.data?.data ?? []

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Banco</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty isEmpty={isBlank(transactions)} />
            {transactions.map((transaction) => (
              <Item key={transaction.id} transaction={transaction} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
