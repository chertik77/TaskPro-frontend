import type { QueryClient } from '@tanstack/react-query'

import { sessionQueries } from '../api/queries'

export const clearUserCache = (queryClient: QueryClient) => {
  queryClient.clear()
  queryClient.setQueryData(sessionQueries.current().queryKey, null)
}
