import type { Dispatch, SetStateAction } from 'react'
import type { AddTaskSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { taskService } from '@/entities/task'

export const useAddTask = (
  columnId: string,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: (data: AddTaskSchema) =>
      taskService.addTask({
        columnId,
        ...data,
        labels: data.labels?.map(l => l.id)
      }),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while creating the task. Please try again shortly.'
    },
    onSuccess() {
      setIsDialogOpen(false)
    }
  })
