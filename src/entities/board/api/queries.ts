import { queryOptions } from '@tanstack/react-query'

import { boardService } from './service'

export const boardQueries = {
  all: () => ['boards'],
  lists: () => [...boardQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: boardQueries.lists(),
      queryFn: boardService.getAllBoards
    }),
  details: () => [...boardQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...boardQueries.details(), id],
      queryFn: () => boardService.getBoardById({ boardId: id }),
      enabled: !!id
    })
}
