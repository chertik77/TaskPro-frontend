import { queryOptions } from '@tanstack/react-query'

import { authClient } from '@/shared/api'

export const sessionQueries = {
  all: () => ['session'] as const,
  current: () =>
    queryOptions({
      queryKey: sessionQueries.all(),
      queryFn: async () => await authClient.getSession(),
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: false
    })
}
