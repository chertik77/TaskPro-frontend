import { useQuery } from '@tanstack/react-query'

import { boardService } from '../board.service'
import { BoardCacheKeys } from '../config'
import { useGetParamBoardId } from './useGetParamBoardId'

export const useGetBoardById = () => {
  const { boardId } = useGetParamBoardId()

  return useQuery({
    queryKey: [BoardCacheKeys.Board, boardId],
    queryFn: () => boardService.getBoardById(boardId!),
    enabled: !!boardId
  })
}
