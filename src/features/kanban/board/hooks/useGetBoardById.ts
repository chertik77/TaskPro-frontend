import { useQuery } from '@tanstack/react-query'

import { boardService } from '../board.service'
import { BoardCacheKeys } from '../config'
import { useGetBoardId } from './useGetBoardId'

export const useGetBoardById = () => {
  const boardId = useGetBoardId()

  return useQuery({
    queryKey: [BoardCacheKeys.Board, boardId],
    queryFn: () => boardService.getBoardById(boardId!),
    enabled: !!boardId
  })
}
