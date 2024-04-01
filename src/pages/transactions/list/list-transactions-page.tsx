import React from 'react'

import { Search } from 'lucide-react'

import { FormLabel } from '@/components/ui/form-label/form-label'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Heading } from '@/components/ui/heading/heading'
import { Input } from '@/components/ui/input/input'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Table } from '@/components/ui/table/table'
import { DEFAULT_META } from '@/constants/default-meta'
import { useDebounceCallback } from '@/hooks/use-debounce-callback'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { FormActions } from '@/pages/transactions/list/form/form-actions'
import { useListTransactions } from '@/pages/transactions/list/use-list-transactions'
import { useTransactionFilters } from '@/store/transactions/use-transaction-filters'
import formatCurrency from '@/utils/format-currency'
import formatDate from '@/utils/format-date'
import isBlank from '@/utils/is-blank'

const ListTransactionsPage: React.FC = () => {
  const { qs, page, setPage, setQs } = useTransactionFilters()
  const { data, isPending } = useListTransactions()

  const transactions = data?.data?.data ?? []
  const meta = data?.data?.meta ?? DEFAULT_META

  const refresh = useDebounceCallback(() => {
    setPage(1)
  })

  return (
    <PageContentLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <Heading as="h1">Transações</Heading>

          <FormActions />
        </div>

        <GridRow className="mb-4">
          <GridItem>
            <FormLabel>Pesquisar</FormLabel>

            <Input
              value={qs}
              onChange={(event) => {
                setQs(event.target.value)
                refresh()
              }}
              placeholder="Pesquise a transação"
              endDecorator={<Search />}
            />
          </GridItem>
        </GridRow>

        <LinearProgress isLoading={isPending} />
        <div className="rounded-md border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Data</Table.Head>
                <Table.Head>Categoria</Table.Head>
                <Table.Head>Banco</Table.Head>
                <Table.Head>Descrição</Table.Head>
                <Table.Head>Valor</Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Empty isEmpty={isBlank(transactions)} />
              {transactions.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell className="font-medium">
                    {formatDate(item.date)}
                  </Table.Cell>
                  <Table.Cell>{item?.category?.name}</Table.Cell>
                  <Table.Cell>{item?.bankAccount?.name}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{formatCurrency(item.amount)}</Table.Cell>
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
      </div>
    </PageContentLayout>
  )
}

export default ListTransactionsPage
