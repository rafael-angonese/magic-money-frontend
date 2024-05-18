import { useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  InputSelect,
  InputSelectProps,
} from '@/components/ui/input-select/input-select'
import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { getBankAccounts } from '@/repositories/bank-accounts/get-bank-accounts'
import { BankAccount } from '@/types/bank-acount'
import handlingRequestError from '@/utils/handling-request-error'

export interface InputSelectBankAccountProps<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
> extends Omit<
    InputSelectProps<BankAccount, Multiple, DisableClearable, false>,
    'options'
  > {}

export const InputSelectBankAccount = <
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
>({
  ...props
}: InputSelectBankAccountProps<Multiple, DisableClearable>) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const debouncedInputValue = useDebounce(inputValue)

  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.bankAccounts, { qs: debouncedInputValue }],
    queryFn: () =>
      getBankAccounts({ page: 1, perPage: 200, qs: debouncedInputValue }),
    enabled: open,
    placeholderData: keepPreviousData,
    throwOnError(error) {
      handlingRequestError(error)
      return false
    },
  })

  const bankAccounts = data?.data?.data ?? []

  return (
    <InputSelect
      options={bankAccounts}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      loading={isFetching}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      {...props}
    />
  )
}

InputSelectBankAccount.displayName = 'InputSelectBankAccount'
