import { useQuery } from '@tanstack/react-query'
import { boardService } from 'shared/api/board'

import { BoardCacheKeys } from '../config'

export const useGetAllBoards = () =>
  useQuery({
    queryKey: [BoardCacheKeys.Boards],
    queryFn: boardService.getAllBoards
  })
