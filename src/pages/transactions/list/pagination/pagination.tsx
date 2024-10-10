import React from 'react'

import { Pagination as PaginationMui } from '@/components/ui/pagination/pagination'
import { DEFAULT_META } from '@/constants/default-meta'
import { useListTransactions } from '@/pages/transactions/list/hooks/use-list-transactions'
import { useTransactionFiltersStore } from '@/pages/transactions/list/hooks/use-transaction-filters-store'

export const Pagination: React.FC = () => {
  const { page, setPage } = useTransactionFiltersStore()
  const { data } = useListTransactions()

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
