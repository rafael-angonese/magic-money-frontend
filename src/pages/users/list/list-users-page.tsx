import React from 'react'

import { Search } from 'lucide-react'

import { FormLabel } from '@/components/ui/form-label/form-label'
import { Grid } from '@/components/ui/grid/grid'
import { Heading } from '@/components/ui/heading/heading'
import { Input } from '@/components/ui/input/input'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Table } from '@/components/ui/table/table'
import { DEFAULT_META } from '@/constants/default-meta'
import { useDebounceCallback } from '@/hooks/use-debounce-callback'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useListUsers } from '@/pages/users/list/use-list-users'
import { useUserFilters } from '@/store/users/use-user-filters'
import formatDate from '@/utils/format-date'
import isBlank from '@/utils/is-blank'

export const ListUsersPage: React.FC = () => {
  const { qs, page, setPage, setQs } = useUserFilters()
  const { data, isPending } = useListUsers()

  const users = data?.data?.data ?? []
  const meta = data?.data?.meta ?? DEFAULT_META

  const refresh = useDebounceCallback(() => {
    setPage(1)
  })

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-4">
          <Heading as="h1">Usuários</Heading>

          {/* <Button color="success" asChild>
            <Link to="/users/new">Nova usuário</Link>
          </Button> */}
        </div>

        <Grid.Row className="mb-4">
          <Grid.Item>
            <FormLabel>Pesquisar</FormLabel>

            <Input
              value={qs}
              onChange={(event) => {
                setQs(event.target.value)
                refresh()
              }}
              placeholder="Digite o nome do usuário"
              endDecorator={<Search />}
            />
          </Grid.Item>
        </Grid.Row>

        <LinearProgress isLoading={isPending} />
        <div className="rounded-md border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Nome</Table.Head>
                <Table.Head>E-mail</Table.Head>
                <Table.Head>Criado em</Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Empty isEmpty={isBlank(users)} />
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell className="font-medium">{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                  <Table.Cell className="flex gap-4" />
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
        <LinearProgress isLoading={isPending} />

        <div className="flex justify-end my-6">
          <Pagination
            page={page}
            totalPages={meta.lastPage}
            onPageChange={(value) => setPage(value)}
          />
        </div>
      </PageContentLayout>
    </>
  )
}
