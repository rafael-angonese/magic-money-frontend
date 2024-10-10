import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { useTransactionFiltersStore } from '@/pages/transactions/list/hooks/use-transaction-filters-store'
import { getTransactions } from '@/repositories/transactions/get-transactions'

export const useListTransactions = () => {
  const { qs, page } = useTransactionFiltersStore()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.transactions, { page, qs: debouncedQs }],
    queryFn: () => getTransactions({ page, qs: debouncedQs }),
  })

  return query
}
