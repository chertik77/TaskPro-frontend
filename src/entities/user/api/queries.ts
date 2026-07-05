import { queryOptions } from '@tanstack/react-query'

import { authClient } from '@/shared/api'

export const userQueries = {
  current: () => ['me'],
  me: () =>
    queryOptions({
      queryKey: userQueries.current(),
      queryFn: async () => {
        const session = await authClient.getSession()

        return session?.user || null
      },
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: false
    })
}
