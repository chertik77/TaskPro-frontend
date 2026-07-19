import { queryOptions } from '@tanstack/react-query'

import { getAllSettings } from '@/shared/api'

export const settingQueries = {
  all: () => ['settings'],
  lists: () => [...settingQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: settingQueries.lists(),
      queryFn: async () => (await getAllSettings()).data,
      staleTime: Infinity,
      gcTime: Infinity
    })
}
