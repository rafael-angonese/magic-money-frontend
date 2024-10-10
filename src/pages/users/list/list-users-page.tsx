import React from 'react'

import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useListUsers } from '@/pages/users/list/hooks/use-list-users'

import { Filters } from './filters/filters'
import { Header } from './header/header'
import { List } from './list/list'
import { Pagination } from './pagination/pagination'

export const ListUsersPage: React.FC = () => {
  const { isPending } = useListUsers()

  return (
    <>
      <PageContentLayout>
        <Header />
        <Filters />
        <LinearProgress isLoading={isPending} />
        <List />
        <LinearProgress isLoading={isPending} />
        <Pagination />
      </PageContentLayout>
    </>
  )
}
