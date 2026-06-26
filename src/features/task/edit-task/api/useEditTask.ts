import type { Dispatch, SetStateAction } from 'react'
import type { EditTaskSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { taskService } from '@/entities/task'

export const useEditTask = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: EditTaskSchema }) =>
      taskService.editTask({
        taskId,
        ...data,
        labels: data.labels?.map(l => l.id)
      }),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while editing the task. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
