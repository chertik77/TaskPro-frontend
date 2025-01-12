import { queryOptions } from '@tanstack/react-query'

import { boardService } from './board.service'
import { BoardCacheKeys } from './config'

export const boardQueryOptions = (boardId: string) =>
  queryOptions({
    queryKey: [BoardCacheKeys.Board, boardId],
    queryFn: () => boardService.getBoardById(boardId!)
  })
