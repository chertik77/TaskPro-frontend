import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { deleteColumnMutation, vBoard } from '@/shared/api'

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    ...deleteColumnMutation(),
    meta: {
      errorMessage:
        'An error occurred while deleting the column. Please try again shortly.'
    },
    onMutate: async ({ path: { columnId } }) => {
      await queryClient.cancelQueries({ queryKey: boardQueryKey })

      const previousBoard = queryClient.getQueryData(boardQueryKey)

      const parsedPreviousBoard = parse(vBoard, previousBoard)

      queryClient.setQueryData(boardQueryKey, oldBoard => {
        if (!oldBoard) return oldBoard

        const parsedOldBoard = parse(vBoard, oldBoard)

        return {
          ...parsedOldBoard,
          columns: parsedOldBoard.columns?.filter(
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
