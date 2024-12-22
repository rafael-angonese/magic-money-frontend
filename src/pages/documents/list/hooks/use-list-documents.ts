import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/constants/react-query-keys'
import { useDebounce } from '@/hooks/use-debounce'
import { useDocumentsFiltersStore } from '@/pages/documents/list/hooks/use-documents-filters-store'
import { getDocuments } from '@/repositories/documents/get-documents'
import handlingRequestError from '@/utils/handling-request-error'

export const useListDocuments = () => {
  const { qs, page } = useDocumentsFiltersStore()

  const debouncedQs = useDebounce(qs)

  const query = useQuery({
    queryKey: [queryKeys.documents, { page, qs: debouncedQs }],
    queryFn: () =>
      getDocuments({
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
