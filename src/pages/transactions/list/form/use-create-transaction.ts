import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mutationKeys, queryKeys } from '@/constants/react-query-keys'
import {
  createTransaction,
  CreateTransactionsRequest,
} from '@/repositories/transactions/create-transaction'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: [mutationKeys.transactions.create],
    mutationFn: (values: CreateTransactionsRequest) =>
      createTransaction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactions] })
    },
  })

  return mutation
}
