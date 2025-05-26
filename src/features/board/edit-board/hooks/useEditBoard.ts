import type { BoardDtoTypes } from '@/shared/api/board'
import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { boardQueries } from '@/entities/board'

import { boardService } from '@/shared/api/board'
import { useGetParamBoardId } from '@/shared/hooks'

export const useEditBoard = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: Omit<BoardDtoTypes.EditBoardDto, 'boardId'>) =>
      boardService.editBoard({ boardId: boardId!, ...data }),
    meta: { invalidates: [boardQueries.boardsKey()] },
    onSuccess: () => {
      setIsDialogOpen(false)
    },
    onError: () => {
      toast.error(
        'An error occurred while editing the board. Please try again shortly.'
      )
    }
  })
}
