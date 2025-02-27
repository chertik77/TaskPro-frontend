import { useQuery } from '@tanstack/react-query'

import { boardService } from '@/entities/board'

import { useGetParamBoardId } from '@/shared/hooks'

export const useGetBoardById = () => {
  const { boardId } = useGetParamBoardId()

  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardService.getBoardById(boardId!),
    enabled: !!boardId
  })
}
