import React from 'react'

import { Table } from '@/components/ui/table/table'
import { TableBody } from '@/components/ui/table/table-body'
import { TableEmpty } from '@/components/ui/table/table-empty'
import { TableHead } from '@/components/ui/table/table-head'
import { TableHeader } from '@/components/ui/table/table-header'
import { TableRow } from '@/components/ui/table/table-row'
import { useListUsers } from '@/pages/users/list/hooks/use-list-users'
import isBlank from '@/utils/is-blank'

import { Item } from './item'

export const List: React.FC = () => {
  const { data } = useListUsers()

  const users = data?.data?.data ?? []

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty isEmpty={isBlank(users)} />
            {users.map((user) => (
              <Item key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
