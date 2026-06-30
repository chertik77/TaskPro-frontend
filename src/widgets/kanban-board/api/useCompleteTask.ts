import type { TaskDtoTypes } from '@/entities/task'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import {
  BoardContracts,
  boardQueries,
  useGetParamBoardId
} from '@/entities/board'
import { taskService } from '@/entities/task'

export const useCompleteTask = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    mutationFn: ({
      taskId,
      completed
    }: Required<Pick<TaskDtoTypes.EditTaskDto, 'completed' | 'taskId'>>) =>
      taskService.editTask({ taskId, completed }),
    meta: {
      errorMessage:
        'An error occurred while completing the task. Please try again shortly.'
    },
    onMutate: async ({ completed, taskId }) => {
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
          ...oldBoard,
          columns: parsedOldBoard.columns.map(column => ({
            ...column,
            tasks: column.tasks.map(task => {
              if (task.id === taskId) return { ...task, completed }

              return task
            })
          }))
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
