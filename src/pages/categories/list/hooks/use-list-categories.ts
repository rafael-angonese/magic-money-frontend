import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { useCategoryFiltersStore } from '@/pages/categories/list/hooks/use-category-filters-store'
import { getCategories } from '@/repositories/categories/get-categories'

export const useListCategories = () => {
  const { qs, page } = useCategoryFiltersStore()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.categories, { page, qs: debouncedQs }],
    queryFn: () => getCategories({ page, qs: debouncedQs }),
  })

  return query
}
