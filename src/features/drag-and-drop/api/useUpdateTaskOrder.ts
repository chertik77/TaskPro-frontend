import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { taskService } from '@/entities/task'

export const useUpdateTaskOrder = () =>
  useMutation({
    mutationFn: taskService.updateTaskOrder,
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'Unexpected error during tasks reordering. We apologize for the inconvenience. Please try again later.'
    }
  })
