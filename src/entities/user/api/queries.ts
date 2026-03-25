import { queryOptions } from '@tanstack/react-query'

import { userService } from './service'

export const userQueries = {
  current: () => ['me'],
  me: () =>
    queryOptions({
      queryKey: userQueries.current(),
      queryFn: userService.getMe,
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: false
    })
}
