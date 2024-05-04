import { useQuery } from '@tanstack/react-query'

import { boardService } from 'services/board.service'

export const useGetBoardById = (id: string) =>
  useQuery({
    queryKey: ['board', id],
    queryFn: () => boardService.getBoardById(id)
  })
