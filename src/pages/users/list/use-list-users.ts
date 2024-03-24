import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { getUsers } from '@/repositories/users/get-users'
import { useUserFilters } from '@/store/users/use-user-filters'

export const useListUsers = () => {
  const { qs, page } = useUserFilters()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.users, { page, qs: debouncedQs }],
    queryFn: () => getUsers({ page, qs: debouncedQs }),
  })

  return query
}
