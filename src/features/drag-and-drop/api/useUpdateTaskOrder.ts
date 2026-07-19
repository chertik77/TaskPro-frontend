import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { updateTasksOrderMutation } from '@/shared/api'

export const useUpdateTaskOrder = () =>
  useMutation({
    ...updateTasksOrderMutation(),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'Unexpected error during tasks reordering. We apologize for the inconvenience. Please try again later.'
    }
  })
