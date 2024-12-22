import React from 'react'

import { Pagination as PaginationMui } from '@/components/ui/pagination/pagination'
import { DEFAULT_META } from '@/constants/default-meta'
import { useDocumentsFiltersStore } from '@/pages/documents/list/hooks/use-documents-filters-store'
import { useListDocuments } from '@/pages/documents/list/hooks/use-list-documents'

export const Pagination: React.FC = () => {
  const { page, setPage } = useDocumentsFiltersStore()
  const { data } = useListDocuments()

  const meta = data?.data?.meta ?? DEFAULT_META

  return (
    <>
      <div className="flex justify-end my-6">
        <PaginationMui
          page={page}
          totalPages={meta.lastPage}
          onPageChange={(value) => setPage(value)}
        />
      </div>
    </>
  )
}
