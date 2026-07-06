import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useGetParamBoardId } from '@/entities/board'

import { getBoardByIdQueryKey, updateColumnMutation } from '@/shared/api'

export const useEditColumn = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const boardId = useGetParamBoardId()

  return useMutation({
    ...updateColumnMutation(),
    meta: {
      invalidates: [getBoardByIdQueryKey({ path: { boardId } })],
      errorMessage:
        'An error occurred while editing the column. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
}
