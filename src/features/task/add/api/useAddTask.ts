import type { AddTaskSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { createTask } from '@/shared/api'

export const useAddTask = (columnId: string, closeDialog: () => void) =>
  useMutation({
    mutationFn: (data: AddTaskSchema) =>
      createTask({ path: { columnId }, body: data }),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while creating the task. Please try again.'
    },
    onSuccess() {
      closeDialog()
    }
  })
