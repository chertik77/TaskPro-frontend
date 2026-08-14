import type { UpdateTaskData } from '@/shared/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { updateTask } from '@/shared/api'

type CompleteTaskMutation = UpdateTaskData['path'] & { completed: boolean }

export const useCompleteTask = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    mutationFn: ({ taskId, completed }: CompleteTaskMutation) =>
      updateTask({ path: { taskId }, body: { completed } }),
    meta: {
      errorMessage:
        'An error occurred while completing the task. Please try again.'
    },
    onMutate: async ({ completed, taskId }) => {
      await queryClient.cancelQueries({ queryKey: boardQueryKey })

      const previousBoard = queryClient.getQueryData(boardQueryKey)

      queryClient.setQueryData(boardQueryKey, oldBoard => {
        if (!oldBoard) return oldBoard

        return {
          ...oldBoard,
          columns: oldBoard.columns?.map(column => ({
            ...column,
            tasks: column.tasks?.map(task =>
              task.id === taskId ? { ...task, completed } : task
            )
          }))
        }
      })

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
