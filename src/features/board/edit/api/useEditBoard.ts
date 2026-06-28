import type { Dispatch, SetStateAction } from 'react'
import type { EditBoardSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import {
  boardQueries,
  boardService,
  useGetParamBoardId
} from '@/entities/board'

export const useEditBoard = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: EditBoardSchema) =>
      boardService.editBoard({ boardId, ...data }),
    meta: {
      invalidates: [boardQueries.all()],
      errorMessage:
        'An error occurred while editing the board. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
}
