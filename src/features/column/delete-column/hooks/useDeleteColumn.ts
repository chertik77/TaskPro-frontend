import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { columnService } from '@/shared/api/column'
import { useGetParamBoardId } from '@/shared/hooks'

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

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

      queryClient.setQueryData(
        boardQueryKey,
        oldBoard =>
          oldBoard && {
            ...oldBoard,
            columns:
              oldBoard.columns &&
              oldBoard.columns.filter(column => column.id !== columnId)
          }
      )

      return { previousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(boardQueryKey, context?.previousBoard)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKey })
    }
  })
}
