import { queryOptions } from '@tanstack/react-query'

import { getAllBoards, getBoardById } from '@/shared/api'

export const boardQueries = {
  all: () => ['boards'],
  lists: () => [...boardQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: boardQueries.lists(),
      queryFn: async () => (await getAllBoards()).data,
      staleTime: 60_000 // 1 minute
    }),
  details: () => [...boardQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...boardQueries.details(), id],
      queryFn: async () => (await getBoardById({ path: { boardId: id } })).data,
      enabled: !!id,
      staleTime: 5 * 60_000 // 5 minutes
    })
}
