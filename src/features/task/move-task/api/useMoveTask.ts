import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { taskService } from '@/entities/task'

export const useMoveTask = () =>
  useMutation({
    mutationFn: taskService.editTask,
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while moving the task. Please try again shortly.'
    }
  })
