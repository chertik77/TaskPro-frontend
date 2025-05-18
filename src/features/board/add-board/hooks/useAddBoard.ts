import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import type { AddBoardSchema } from '../add-board.contract'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { boardService } from '@/shared/api/board'

export const useAddBoard = (
  reset: UseFormReset<AddBoardSchema>,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: boardService.addBoard,
    meta: { invalidates: [['boards']] },
    onSuccess(data) {
      setIsDialogOpen(false)
      reset()
      navigate({ to: `/dashboard/$boardId`, params: { boardId: data.id } })
    },
    onError() {
      toast.error(
        'An error occurred while creating the board. Please try again shortly.'
      )
    }
  })
}
