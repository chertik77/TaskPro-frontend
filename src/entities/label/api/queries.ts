import { queryOptions } from '@tanstack/react-query'

import { getAllLabels } from '@/shared/api'

export const labelQueries = {
  all: () => ['labels'] as const,
  lists: () => [...labelQueries.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: labelQueries.lists(),
      queryFn: async () => (await getAllLabels()).data,
      staleTime: Infinity,
      gcTime: Infinity
    })
}
