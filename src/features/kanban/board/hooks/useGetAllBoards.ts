import { useQuery } from '@tanstack/react-query'

import { boardService } from '../board.service'
import { BoardCacheKeys } from '../config'

export const useGetAllBoards = () =>
  useQuery({
    queryKey: [BoardCacheKeys.Boards],
    queryFn: boardService.getAllBoards
  })
