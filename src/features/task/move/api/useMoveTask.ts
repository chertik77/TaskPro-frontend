import type { UpdateTaskData } from '@/shared/api'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { updateTask } from '@/shared/api'

type MoveTaskMutation = UpdateTaskData['path'] &
  Pick<UpdateTaskData['body'], 'columnId'>

export const useMoveTask = () =>
  useMutation({
    mutationFn: ({ taskId, columnId }: MoveTaskMutation) =>
      updateTask({ path: { taskId }, body: { columnId } }),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage: 'An error occurred while moving the task. Please try again.'
    }
  })
