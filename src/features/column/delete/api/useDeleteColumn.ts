import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { deleteColumnMutation } from '@/shared/api'
import { setOptimisticData } from '@/shared/lib'

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    ...deleteColumnMutation(),
    meta: {
      errorMessage:
        'An error occurred while deleting the column. Please try again.'
    },
    onMutate: ({ path: { columnId } }) =>
      setOptimisticData(queryClient, boardQueryKey, board => ({
        ...board,
        columns: board.columns?.filter(column => column.id !== columnId)
      })),
    onError: (_, __, context) => context?.rollback(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKey })
    }
  })
}
