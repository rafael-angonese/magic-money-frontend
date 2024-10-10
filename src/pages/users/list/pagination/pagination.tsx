import React from 'react'

import { Pagination as PaginationMui } from '@/components/ui/pagination/pagination'
import { DEFAULT_META } from '@/constants/default-meta'
import { useListUsers } from '@/pages/users/list/hooks/use-list-users'
import { useUserFiltersStore } from '@/pages/users/list/hooks/use-user-filters-stores'

export const Pagination: React.FC = () => {
  const { page, setPage } = useUserFiltersStore()
  const { data } = useListUsers()

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
