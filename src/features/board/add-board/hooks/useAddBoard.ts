import type { UseFormReset } from 'react-hook-form'
import type { AddBoardSchema } from '../add-board.contract'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { boardService } from '@/shared/api/board'

import { AddBoardModal } from '../components/AddBoardModal'

export const useAddBoard = (reset: UseFormReset<AddBoardSchema>) => {
  const navigate = useNavigate()

  const { close: closeNewBoardModal } = useModal(AddBoardModal)

  return useMutation({
    mutationFn: boardService.addNewBoard,
    meta: { invalidates: [['boards']] },
    onSuccess(data) {
      closeNewBoardModal()
      reset()
      navigate({ to: `/dashboard/$boardId`, params: { boardId: data.id } })
    },
    onError(e) {
      console.error(e)
      toast.error(
        'An error occurred while creating the board. Please try again shortly.'
      )
    }
  })
}
