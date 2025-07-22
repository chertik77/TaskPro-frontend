import type { Dispatch, SetStateAction } from 'react'
import type { AddColumnSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'
import { columnService } from '@/entities/column'

export const useAddColumn = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: AddColumnSchema) =>
      columnService.addColumn({ boardId, ...data }),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while creating the column. Please try again shortly.'
    },
    onSuccess() {
      setIsDialogOpen(false)
    }
  })
}
