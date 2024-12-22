import React from 'react'

import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { DeleteDocumentModal } from '@/pages/documents/components/delete-document-modal/delete-document-modal'
import { useListDocuments } from '@/pages/documents/list/hooks/use-list-documents'

import { Filters } from './filters/filters'
import { Header } from './header/header'
import { List } from './list/list'
import { Pagination } from './pagination/pagination'

export const ListDocumentsPage: React.FC = () => {
  const { isPending, refetch } = useListDocuments()

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

      <DeleteDocumentModal onSuccess={() => refetch()} />
    </>
  )
}
