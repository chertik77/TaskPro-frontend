import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { taskService } from '@/entities/task'

export const useEditTask = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: taskService.editTask,
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while editing the task. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
