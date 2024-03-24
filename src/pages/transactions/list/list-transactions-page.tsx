import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { Grid } from '@/components/ui/grid/grid'
import { Heading } from '@/components/ui/heading/heading'
import { Input } from '@/components/ui/input/input'
import { InputGroup } from '@/components/ui/input-group/input-group'
import { InputRightElement } from '@/components/ui/input-right-element/input-right-element'
import { Label } from '@/components/ui/label/label'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Table } from '@/components/ui/table/table'
import { DEFAULT_META } from '@/constants/default-meta'
import { queryKeys } from '@/constants/react-query-keys'
import useDebounce from '@/hooks/use-debounce'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { FormActions } from '@/pages/transactions/list/form/form-actions'
import { getTransactions } from '@/repositories/transactions/get-transactions'
import formatCurrency from '@/utils/format-currency'
import formatDate from '@/utils/format-date'
import isBlank from '@/utils/is-blank'

const ListTransactionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    qs: searchParams.get('qs') || '',
  })
  const debouncedFilters = useDebounce(filters)

  const page = Number(searchParams.get('page')) || 1

  const { data, isPending } = useQuery({
    queryKey: [queryKeys.transactions, { page, ...debouncedFilters }],
    queryFn: () => getTransactions({ page, ...debouncedFilters }),
  })

  const transactions = data?.data?.data ?? []
  const meta = data?.data?.meta ?? DEFAULT_META

  return (
    <PageContentLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <Heading as="h1">Transações</Heading>

          <FormActions />
        </div>

        <Grid.Row className="mb-4">
          <Grid.Item>
            <Label>Pesquisar</Label>
            <InputGroup>
              <Input
                value={filters.qs}
                onChange={(event) => {
                  setFilters({
                    qs: event.target.value,
                  })
                  setSearchParams((state) => {
                    state.set('qs', event.target.value)
                    state.set('page', '1')

                    return state
                  })
                }}
                placeholder="Pesquise a transação"
              />
              <InputRightElement>
                <Search />
              </InputRightElement>
            </InputGroup>
          </Grid.Item>
        </Grid.Row>

        {isPending && <LinearProgress indeterminate size="xs" />}
        <div className="rounded-md border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Data</Table.Head>
                <Table.Head>Categoria</Table.Head>
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
                  <Table.Cell>cat</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{formatCurrency(item.amount)}</Table.Cell>
                  <Table.Cell className="flex gap-4" />
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
        {isPending && <LinearProgress indeterminate size="xs" />}

        <div className="flex justify-end my-6">
          <Pagination
            page={page}
            totalPages={meta.lastPage}
            onPageChange={(value) => {
              setSearchParams((state) => {
                state.set('page', String(value))

                return state
              })
            }}
          />
        </div>
      </div>
    </PageContentLayout>
  )
}

export default ListTransactionsPage
