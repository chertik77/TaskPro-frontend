import type { Dispatch, SetStateAction } from 'react'
import type { EditBoardSchema } from '../edit-board.contract'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { boardService } from '@/shared/api/board'
import { useGetParamBoardId } from '@/shared/hooks'

export const useEditBoard = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: EditBoardSchema) =>
      boardService.editBoard({ boardId, ...data }),
    meta: {
      invalidates: [boardQueries.boardsKey()],
      errorMessage:
        'An error occurred while editing the board. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
}
