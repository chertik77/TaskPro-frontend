import type { BoardDtoTypes } from '@/shared/api/board'

import { useQuery } from '@tanstack/react-query'

import { boardService } from '@/shared/api/board'
import { useGetParamBoardId } from '@/shared/hooks'

export const useGetBoardById = <T = BoardDtoTypes.BoardDto>(
  select?: (data: BoardDtoTypes.BoardDto) => T
) => {
  const { boardId } = useGetParamBoardId()

  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardService.getBoardById({ boardId: boardId! }),
    enabled: !!boardId,
    select
  })
}
