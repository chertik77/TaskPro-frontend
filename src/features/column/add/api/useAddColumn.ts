import type { Dispatch, SetStateAction } from 'react'
import type { AddColumnSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { useGetParamBoardId } from '@/entities/board'

import { createColumn, getBoardByIdQueryKey } from '@/shared/api'

export const useAddColumn = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: AddColumnSchema) =>
      createColumn({ path: { boardId }, body: data }),
    meta: {
      invalidates: [getBoardByIdQueryKey({ path: { boardId } })],
      errorMessage:
        'An error occurred while creating the column. Please try again shortly.'
    },
    onSuccess() {
      setIsDialogOpen(false)
    }
  })
}
