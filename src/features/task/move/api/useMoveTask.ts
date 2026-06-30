import type { TaskDtoTypes } from '@/entities/task'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { taskService } from '@/entities/task'

export const useMoveTask = () =>
  useMutation({
    mutationFn: ({
      taskId,
      columnId
    }: Required<Pick<TaskDtoTypes.EditTaskDto, 'taskId' | 'columnId'>>) =>
      taskService.editTask({ taskId, columnId }),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while moving the task. Please try again shortly.'
    }
  })
