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
import { TableBody } from '@/components/ui/table/table-body'
import { TableCell } from '@/components/ui/table/table-cell'
import { TableEmpty } from '@/components/ui/table/table-empty'
import { TableHead } from '@/components/ui/table/table-head'
import { TableHeader } from '@/components/ui/table/table-header'
import { TableRow } from '@/components/ui/table/table-row'
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
          <Table>
            <TableHeader>
              <TableRow>
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
              {transactions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {formatDate(item.date, {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{item?.category?.name}</TableCell>
                  <TableCell>{item?.bankAccount?.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{formatCurrency(item.amount)}</TableCell>
                  <TableCell className="flex gap-4" />
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
