import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useGetParamBoardId } from '@/entities/board'

import { getBoardByIdQueryKey, updateTaskMutation } from '@/shared/api'

export const useEditTask = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const boardId = useGetParamBoardId()

  return useMutation({
    ...updateTaskMutation(),
    meta: {
      invalidates: [getBoardByIdQueryKey({ path: { boardId } })],
      errorMessage:
        'An error occurred while editing the task. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
}
