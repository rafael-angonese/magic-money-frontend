import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { useBankAccountFiltersStore } from '@/pages/bank-accounts/list/hooks/use-bank-account-filters-store'
import { getBankAccounts } from '@/repositories/bank-accounts/get-bank-accounts'
import handlingRequestError from '@/utils/handling-request-error'

export const useListBankAccounts = () => {
  const { qs, page } = useBankAccountFiltersStore()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.bankAccounts, { page, qs: debouncedQs }],
    queryFn: () =>
      getBankAccounts({
        page,
        qs: debouncedQs,
      }),
    placeholderData: keepPreviousData,
    throwOnError(error) {
      handlingRequestError(error)
      return false
    },
  })

  return query
}
