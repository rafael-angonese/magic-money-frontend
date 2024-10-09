import React from 'react'

import { Table } from '@/components/ui/table/table'
import { TableBody } from '@/components/ui/table/table-body'
import { TableEmpty } from '@/components/ui/table/table-empty'
import { TableHead } from '@/components/ui/table/table-head'
import { TableHeader } from '@/components/ui/table/table-header'
import { TableRow } from '@/components/ui/table/table-row'
import { useListBankAccounts } from '@/pages/bank-accounts/list/hooks/use-list-bank-accounts'
import isBlank from '@/utils/is-blank'

import { Item } from './item'

export const List: React.FC = () => {
  const { data } = useListBankAccounts()

  const bankAccounts = data?.data?.data ?? []

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty isEmpty={isBlank(bankAccounts)} />
            {bankAccounts.map((bankAccount) => (
              <Item key={bankAccount.id} bankAccount={bankAccount} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
