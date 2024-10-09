import React from 'react'

import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useListCategories } from '@/pages/categories/list/hooks/use-list-categories'

import { Filters } from './filters/filters'
import { Header } from './header/header'
import { List } from './list/list'
import { Pagination } from './pagination/pagination'

export const ListCategoriesPage: React.FC = () => {
  const { isPending } = useListCategories()

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
