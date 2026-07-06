import type { UpdateTaskData } from '@/shared/api'

import { useMutation } from '@tanstack/react-query'

import { useGetParamBoardId } from '@/entities/board'

import { getBoardByIdQueryKey, updateTask } from '@/shared/api'

type MoveTaskMutation = UpdateTaskData['path'] &
  Pick<UpdateTaskData['body'], 'columnId'>

export const useMoveTask = () => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: ({ taskId, columnId }: MoveTaskMutation) =>
      updateTask({ path: { taskId }, body: { columnId } }),
    meta: {
      invalidates: [getBoardByIdQueryKey({ path: { boardId } })],
      errorMessage:
        'An error occurred while moving the task. Please try again shortly.'
    }
  })
}
