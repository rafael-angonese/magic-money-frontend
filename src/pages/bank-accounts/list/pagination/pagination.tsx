import React from 'react'

import { Pagination as PaginationMui } from '@/components/ui/pagination/pagination'
import { DEFAULT_META } from '@/constants/default-meta'
import { useBankAccountFiltersStore } from '@/pages/bank-accounts/list/hooks/use-bank-account-filters-store'
import { useListBankAccounts } from '@/pages/bank-accounts/list/hooks/use-list-bank-accounts'

export const Pagination: React.FC = () => {
  const { page, setPage } = useBankAccountFiltersStore()
  const { data } = useListBankAccounts()

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
