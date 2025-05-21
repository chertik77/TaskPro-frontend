import type { BoardDtoTypes } from '@/shared/api/board'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useQuery } from '@tanstack/react-query'

import { boardService } from '@/shared/api/board'
import { useGetParamBoardId } from '@/shared/hooks'

export const useGetBoardById = <T = BoardDtoTypes.BoardDto>(
  options?: Omit<
    UseQueryOptions<BoardDtoTypes.BoardDto, AxiosError, T>,
    'queryKey' | 'queryFn'
  >
) => {
  const { boardId } = useGetParamBoardId()

  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardService.getBoardById({ boardId: boardId! }),
    enabled: !!boardId,
    ...options
  })
}
