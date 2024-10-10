import React from 'react'

import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useListTransactions } from '@/pages/transactions/list/hooks/use-list-transactions'

import { Filters } from './filters/filters'
import { Header } from './header/header'
import { List } from './list/list'
import { Pagination } from './pagination/pagination'

const ListTransactionsPage: React.FC = () => {
  const { isPending } = useListTransactions()

  return (
    <PageContentLayout>
      <Header />
      <Filters />
      <LinearProgress isLoading={isPending} />
      <List />
      <LinearProgress isLoading={isPending} />
      <Pagination />
    </PageContentLayout>
  )
}

export default ListTransactionsPage
