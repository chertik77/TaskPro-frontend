import { queryOptions } from '@tanstack/react-query'

import { boardService } from './service'

export const boardQueries = {
  boardsKey: () => ['boards'] as const,
  boards: () =>
    queryOptions({
      queryKey: boardQueries.boardsKey(),
      queryFn: boardService.getAllBoards
    }),

  boardKey: () => [...boardQueries.boardsKey(), 'board'] as const,
  board: (id: string) =>
    queryOptions({
      queryKey: [...boardQueries.boardKey(), id],
      queryFn: () => boardService.getBoardById({ boardId: id }),
      enabled: !!id
    })
}
