import React from 'react'

import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { DeleteBankAccountModal } from '@/pages/bank-accounts/components/delete-bank-account-modal/delete-bank-account-modal'
import { useListBankAccounts } from '@/pages/bank-accounts/list/hooks/use-list-bank-accounts'

import { Filters } from './filters/filters'
import { Header } from './header/header'
import { List } from './list/list'
import { Pagination } from './pagination/pagination'

export const ListBankAccountsPage: React.FC = () => {
  const { isPending, refetch } = useListBankAccounts()

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

      <DeleteBankAccountModal onSuccess={() => refetch()} />
    </>
  )
}
