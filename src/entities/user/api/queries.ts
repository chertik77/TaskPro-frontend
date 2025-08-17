import { queryOptions } from '@tanstack/react-query'

import { userService } from './service'

export const userQueries = {
  current: () => ['user'],
  me: () =>
    queryOptions({
      queryKey: userQueries.current(),
      queryFn: userService.getMe,
      staleTime: Infinity
    })
}
