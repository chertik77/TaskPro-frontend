import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import {
  BoardContracts,
  boardQueries,
  useGetParamBoardId
} from '@/entities/board'
import { columnService } from '@/entities/column'

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.board(boardId).queryKey

  return useMutation({
    mutationFn: columnService.deleteColumn,
    meta: {
      errorMessage:
        'An error occurred while deleting the column. Please try again shortly.'
    },
    onMutate: async ({ columnId }) => {
      await queryClient.cancelQueries({ queryKey: boardQueryKey })

      const previousBoard = queryClient.getQueryData(boardQueryKey)

      const parsedPreviousBoard = parse(
        BoardContracts.BoardSchema,
        previousBoard
      )

      queryClient.setQueryData(boardQueryKey, oldBoard => {
        if (!oldBoard) return oldBoard

        const parsedOldBoard = parse(BoardContracts.BoardSchema, oldBoard)

        return {
          ...parsedOldBoard,
          columns: parsedOldBoard.columns.filter(
            column => column.id !== columnId
          )
        }
      })

      return { previousBoard: parsedPreviousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(boardQueryKey, context?.previousBoard)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKey })
    }
  })
}
