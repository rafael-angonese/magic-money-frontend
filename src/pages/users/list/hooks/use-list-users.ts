import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { useUserFiltersStore } from '@/pages/users/list/hooks/use-user-filters-stores'
import { getUsers } from '@/repositories/users/get-users'

export const useListUsers = () => {
  const { qs, page } = useUserFiltersStore()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.users, { page, qs: debouncedQs }],
    queryFn: () => getUsers({ page, qs: debouncedQs }),
  })

  return query
}
