import { boardService } from '@/shared/api/board'
import { useQuery } from '@tanstack/react-query'

import { useGetParamBoardId } from './useGetParamBoardId'

export const useGetBoardById = () => {
  const { boardId } = useGetParamBoardId()

  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardService.getBoardById(boardId!),
    enabled: !!boardId
  })
}
