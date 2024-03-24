import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { getBankAccounts } from '@/repositories/bank-accounts/get-bank-accounts'
import { useBankAccountFilters } from '@/store/bank-accounts/use-bank-account-filters'

export const useListBankAccounts = () => {
  const { qs, page } = useBankAccountFilters()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.bankAccounts, { page, qs: debouncedQs }],
    queryFn: () =>
      getBankAccounts({
        page,
        qs: debouncedQs,
      }),
  })

  return query
}
