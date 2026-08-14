import { queryOptions } from '@tanstack/react-query'

import { getAllBoards, getBoardById } from '@/shared/api'

export const boardQueries = {
  all: () => ['boards'] as const,
  lists: () => [...boardQueries.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: boardQueries.lists(),
      queryFn: async () => (await getAllBoards()).data,
      staleTime: 60_000 // 1 minute
    }),
  details: () => [...boardQueries.all(), 'detail'] as const,
  detail: (id: string) =>
    queryOptions({
      queryKey: [...boardQueries.details(), id] as const,
      queryFn: async () => (await getBoardById({ path: { boardId: id } })).data,
      enabled: !!id,
      staleTime: 5 * 60_000 // 5 minutes
    })
}
