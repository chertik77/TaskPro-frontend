import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useCardFiltersBySearchParams } from 'hooks/card'

import { boardService } from 'services'

import { useGetBoardId } from './useGetBoardId'

export const useGetBoardById = () => {
  const boardId = useGetBoardId()

  const { cardPriority, cardDeadline } = useCardFiltersBySearchParams()

  return useQuery({
    queryKey: ['board', boardId, cardPriority, cardDeadline],
    queryFn: () =>
      boardService.getBoardById(boardId!, {
        priority: cardPriority,
        sortBy: cardDeadline
      }),
    enabled: !!boardId,
    placeholderData: keepPreviousData
  })
}
