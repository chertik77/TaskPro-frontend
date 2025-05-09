import { useQuery } from '@tanstack/react-query'

import { boardService } from '@/shared/api/board'
import { useGetParamBoardId } from '@/shared/hooks'

export const useGetBoardById = () => {
  const { boardId } = useGetParamBoardId()

  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardService.getBoardById({ boardId: boardId! }),
    enabled: !!boardId
  })
}
