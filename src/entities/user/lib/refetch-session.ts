import type { QueryClient } from '@tanstack/react-query'

import { sessionQueries } from '../api/queries'

export const refetchSession = (queryClient: QueryClient) =>
  queryClient.query({ ...sessionQueries.current(), staleTime: 0 })
