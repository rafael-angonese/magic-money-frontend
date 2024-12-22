import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { queryKeys } from '@/constants/react-query-keys'
import { getDocumentById } from '@/repositories/documents/get-document-by-id'
import handlingRequestError from '@/utils/handling-request-error'

export const useGetDocument = () => {
  const { id } = useParams()

  const query = useQuery({
    queryKey: [queryKeys.documents, id],
    queryFn: () => getDocumentById(id!),
    enabled: !!id,
    throwOnError(error) {
      handlingRequestError(error)
      return false
    },
  })

  return query
}
