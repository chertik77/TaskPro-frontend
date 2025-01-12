import { queryOptions } from '@tanstack/react-query'

import { boardService } from './board.service'
import { BoardCacheKeys } from './config'

export const boardsQueryOptions = queryOptions({
  queryKey: [BoardCacheKeys.Boards],
  queryFn: boardService.getAllBoards
})
