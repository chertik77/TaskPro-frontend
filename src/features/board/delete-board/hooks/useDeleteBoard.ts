import type { BoardTypes } from '@/entities/board'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { parse } from 'valibot'

import { BoardContracts, boardQueries } from '@/entities/board'

import { boardService } from '@/shared/api/board'
import { useGetParamBoardId } from '@/shared/hooks'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => boardService.deleteBoard({ boardId: boardId! }),
    meta: {
      errorMessage:
        'An error occurred while deleting the board. Please try again shortly.'
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: boardQueries.boardsKey() })

      const previousBoards = queryClient.getQueryData(boardQueries.boardsKey())

      const parsedPreviousBoards = parse(
        BoardContracts.BoardsSchema,
        previousBoards
      )

      queryClient.setQueryData<BoardTypes.BoardsSchema>(
        boardQueries.boardsKey(),
        oldBoards => {
          if (!oldBoards) return oldBoards

          const parsedOldBoards = parse(BoardContracts.BoardsSchema, oldBoards)

          return parsedOldBoards.filter(b => b.id !== boardId)
        }
      )

      return { previousBoards: parsedPreviousBoards }
    },
    onSuccess: () => {
      navigate({ to: '/dashboard', replace: true })
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        boardQueries.boardsKey(),
        context?.previousBoards
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueries.boardsKey() })
    }
  })
}
