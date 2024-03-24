import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { getTransactions } from '@/repositories/transactions/get-transactions'
import { useTransactionFilters } from '@/store/transactions/use-transaction-filters'

export const useListTransactions = () => {
  const { qs, page } = useTransactionFilters()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.transactions, { page, qs: debouncedQs }],
    queryFn: () => getTransactions({ page, qs: debouncedQs }),
  })

  return query
}
