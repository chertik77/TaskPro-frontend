import type { Dispatch, SetStateAction } from 'react'
import type { AddTaskSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { useGetParamBoardId } from '@/entities/board'

import { createTask, getBoardByIdQueryKey } from '@/shared/api'

export const useAddTask = (
  columnId: string,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: AddTaskSchema) =>
      createTask({ path: { columnId }, body: data }),
    meta: {
      invalidates: [getBoardByIdQueryKey({ path: { boardId } })],
      errorMessage:
        'An error occurred while creating the task. Please try again shortly.'
    },
    onError: e => {
      console.log(e)
    },
    onSuccess() {
      setIsDialogOpen(false)
    }
  })
}
