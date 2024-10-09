import React from 'react'

import { Pagination as PaginationMui } from '@/components/ui/pagination/pagination'
import { DEFAULT_META } from '@/constants/default-meta'
import { useCategoryFiltersStore } from '@/pages/categories/list/hooks/use-category-filters-store'
import { useListCategories } from '@/pages/categories/list/hooks/use-list-categories'

export const Pagination: React.FC = () => {
  const { page, setPage } = useCategoryFiltersStore()
  const { data } = useListCategories()

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
