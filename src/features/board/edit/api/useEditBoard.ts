import type { Dispatch, SetStateAction } from 'react'
import type { EditBoardSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { useGetParamBoardId } from '@/entities/board'

import {
  getAllBoardsQueryKey,
  getBoardByIdQueryKey,
  updateBoard
} from '@/shared/api'

export const useEditBoard = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: EditBoardSchema) =>
      updateBoard({ path: { boardId }, body: data }),
    meta: {
      invalidates: [
        getAllBoardsQueryKey(),
        getBoardByIdQueryKey({ path: { boardId } })
      ],
      errorMessage:
        'An error occurred while editing the board. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
}
