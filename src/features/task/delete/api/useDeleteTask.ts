import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { deleteTaskMutation } from '@/shared/api'
import { setOptimisticData } from '@/shared/lib'

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    ...deleteTaskMutation(),
    meta: {
      errorMessage:
        'An error occurred while deleting the task. Please try again.'
    },
    onMutate: ({ path: { taskId } }) =>
      setOptimisticData(queryClient, boardQueryKey, board => ({
        ...board,
        columns: board.columns?.map(column => ({
          ...column,
          tasks: column.tasks?.filter(task => task.id !== taskId)
        }))
      })),
    onError: (_, __, context) => context?.rollback(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKey })
    }
  })
}
