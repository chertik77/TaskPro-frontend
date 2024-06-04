import { useQuery } from '@tanstack/react-query'

import { boardService } from 'services'

import { useGetBoardId } from './useGetBoardId'

export const useGetBoardById = () => {
  const boardId = useGetBoardId()

  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardService.getBoardById(boardId!)
  })
}
