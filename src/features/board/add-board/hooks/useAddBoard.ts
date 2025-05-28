import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { boardQueries } from '@/entities/board'

import { boardService } from '@/shared/api/board'

export const useAddBoard = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: boardService.addBoard,
    meta: { invalidates: [boardQueries.boardsKey()] },
    onSuccess(data) {
      setIsDialogOpen(false)
      navigate({ to: `/dashboard/$boardId`, params: { boardId: data.id } })
    },
    onError() {
      toast.error(
        'An error occurred while creating the board. Please try again shortly.'
      )
    }
  })
}
