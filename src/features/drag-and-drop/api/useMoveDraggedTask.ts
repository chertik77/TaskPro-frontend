import type { Task } from '@/shared/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { moveTask } from '@/shared/api'
import { setOptimisticData } from '@/shared/lib'

import { applyTaskOrder } from '../lib/applyOrderToBoard'

type MoveDraggedTaskVariables = {
  taskId: string
  columnId: string
  prevTaskId: string | undefined
  nextTaskId: string | undefined
  tasks: Task[]
}

export const useMoveDraggedTask = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const queryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    mutationFn: ({
      taskId,
      columnId,
      prevTaskId,
      nextTaskId
    }: MoveDraggedTaskVariables) =>
      moveTask({
        path: { taskId },
        body: { columnId, prevTaskId, nextTaskId }
      }),
    onMutate: ({ tasks }) =>
      setOptimisticData(queryClient, queryKey, board => ({
        ...board,
        columns: applyTaskOrder(board.columns, tasks)
      })),
    onError: (_error, _variables, context) => {
      context?.rollback()
      queryClient.invalidateQueries({ queryKey })
    },
    meta: {
      errorMessage:
        'Unexpected error while moving the task. We apologize for the inconvenience. Please try again later.'
    }
  })
}
