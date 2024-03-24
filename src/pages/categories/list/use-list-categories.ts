import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { getCategories } from '@/repositories/categories/get-categories'
import { useCategoryFilters } from '@/store/categories/use-category-filters'

export const useListCategories = () => {
  const { qs, page } = useCategoryFilters()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.categories, { page, qs: debouncedQs }],
    queryFn: () => getCategories({ page, qs: debouncedQs }),
  })

  return query
}
