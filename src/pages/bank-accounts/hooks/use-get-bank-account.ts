import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { queryKeys } from '@/constants/react-query-keys'
import { getBankAccountById } from '@/repositories/bank-accounts/get-bank-account-by-id'
import handlingRequestError from '@/utils/handling-request-error'

export const useGetBankAccount = () => {
  const { id } = useParams()

  const query = useQuery({
    queryKey: [queryKeys.bankAccounts, id],
    queryFn: () => getBankAccountById(id!),
    enabled: !!id,
    throwOnError(error) {
      handlingRequestError(error)
      return false
    },
  })

  return query
}
