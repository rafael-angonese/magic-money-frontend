import { useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  InputSelect,
  InputSelectProps,
} from '@/components/ui/input-select/input-select'
import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { getCategories } from '@/repositories/categories/get-categories'
import { Category } from '@/types/category'
import handlingRequestError from '@/utils/handling-request-error'

export interface InputSelectCategoryProps<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
> extends Omit<
    InputSelectProps<Category, Multiple, DisableClearable, false>,
    'options'
  > {}

export const InputSelectCategory = <
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
>({
  ...props
}: InputSelectCategoryProps<Multiple, DisableClearable>) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const debouncedInputValue = useDebounce(inputValue)

  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.categories, { qs: debouncedInputValue }],
    queryFn: () =>
      getCategories({ page: 1, perPage: 200, qs: debouncedInputValue }),
    enabled: open,
    placeholderData: keepPreviousData,
    throwOnError(error) {
      handlingRequestError(error)
      return false
    },
  })

  const categories = data?.data?.data ?? []

  return (
    <InputSelect
      options={categories}
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

InputSelectCategory.displayName = 'InputSelectCategory'
