import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { deleteTaskMutation, vBoard } from '@/shared/api'

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    ...deleteTaskMutation(),
    meta: {
      errorMessage:
        'An error occurred while deleting the task. Please try again shortly.'
    },
    onMutate: async ({ path: { taskId } }) => {
      await queryClient.cancelQueries({ queryKey: boardQueryKey })

      const previousBoard = queryClient.getQueryData(boardQueryKey)

      const parsedPreviousBoard = parse(vBoard, previousBoard)

      queryClient.setQueryData(boardQueryKey, oldBoard => {
        if (!oldBoard) return oldBoard

        const parsedOldBoard = parse(vBoard, oldBoard)

        return {
          ...oldBoard,
          columns: parsedOldBoard.columns?.map(column => ({
            ...column,
            tasks: column.tasks?.filter(task => task.id !== taskId)
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
