import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { boardQueries, boardService } from '@/entities/board'

export const useAddBoard = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: boardService.addBoard,
    meta: {
      invalidates: [boardQueries.boardsKey()],
      errorMessage:
        'An error occurred while creating the board. Please try again shortly.'
    },
    onSuccess(data) {
      setIsDialogOpen(false)
      navigate({ to: `/dashboard/$boardId`, params: { boardId: data.id } })
    }
  })
}
