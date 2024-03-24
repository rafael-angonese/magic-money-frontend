import React from 'react'

import { Pencil, Search } from 'lucide-react'

import { Link } from '@/components/link/link'
import { Button } from '@/components/ui/button/button'
import { Grid } from '@/components/ui/grid/grid'
import { Heading } from '@/components/ui/heading/heading'
import { IconButton } from '@/components/ui/icon-button/icon-button'
import { Input } from '@/components/ui/input/input'
import { InputGroup } from '@/components/ui/input-group/input-group'
import { InputRightElement } from '@/components/ui/input-right-element/input-right-element'
import { Label } from '@/components/ui/label/label'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Table } from '@/components/ui/table/table'
import { DEFAULT_META } from '@/constants/default-meta'
import { useDebounceCallback } from '@/hooks/use-debounce-callback'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { DeleteBankAccount } from '@/pages/bank-accounts/list/delete-bank-account'
import { useListBankAccounts } from '@/pages/bank-accounts/list/use-list-bank-accounts'
import { useBankAccountFilters } from '@/store/bank-accounts/use-bank-account-filters'
import formatCurrency from '@/utils/format-currency'
import isBlank from '@/utils/is-blank'

export const ListBankAccountsPage: React.FC = () => {
  const { qs, page, setPage, setQs } = useBankAccountFilters()
  const { data, isPending } = useListBankAccounts()

  const bankAccounts = data?.data?.data ?? []
  const meta = data?.data?.meta ?? DEFAULT_META

  const refresh = useDebounceCallback(() => {
    setPage(1)
  })

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-4">
          <Heading as="h1">Contas Bancarias</Heading>

          <Button color="success" asChild>
            <Link to="/bank-accounts/new">Nova Conta</Link>
          </Button>
        </div>

        <Grid.Row className="mb-4">
          <Grid.Item>
            <Label>Pesquisar</Label>
            <InputGroup>
              <Input
                value={qs}
                onChange={(event) => {
                  setQs(event.target.value)
                  refresh()
                }}
                placeholder="Digite o nome da conta"
              />
              <InputRightElement>
                <Search />
              </InputRightElement>
            </InputGroup>
          </Grid.Item>
        </Grid.Row>

        <LinearProgress isLoading={isPending} />
        <div className="rounded-md border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Nome</Table.Head>
                <Table.Head>Saldo</Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Empty isEmpty={isBlank(bankAccounts)} />
              {bankAccounts.map((bankAccount) => (
                <Table.Row key={bankAccount.id}>
                  <Table.Cell className="font-medium">
                    {bankAccount.name}
                  </Table.Cell>
                  <Table.Cell>{formatCurrency(bankAccount.balance)}</Table.Cell>
                  <Table.Cell className="flex gap-4">
                    <IconButton hoverTitle="Editar" asChild>
                      <Link to={`/bank-accounts/edit/${bankAccount.id}`}>
                        <Pencil className="text-warning" size={18} />
                      </Link>
                    </IconButton>
                    <DeleteBankAccount bankAccountId={bankAccount.id} />
                  </Table.Cell>
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
