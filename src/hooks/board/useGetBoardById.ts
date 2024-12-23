import { useQuery } from '@tanstack/react-query'

import { CacheKeys } from 'config'
import { boardService } from 'services'

import { useGetBoardId } from './useGetBoardId'

export const useGetBoardById = () => {
  const boardId = useGetBoardId()

  return useQuery({
    queryKey: [CacheKeys.Board, boardId],
    queryFn: () => boardService.getBoardById(boardId!),
    enabled: !!boardId
  })
}
