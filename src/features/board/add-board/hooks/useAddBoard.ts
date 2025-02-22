import type { BoardTypes } from '@/entities/board'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { boardService } from '@/entities/board'

import { AddBoardModal } from '../components/AddBoardModal'

export const useAddBoard = (reset: UseFormReset<BoardTypes.BoardSchema>) => {
  const navigate = useNavigate()

  const { close: closeNewBoardModal } = useModal(AddBoardModal)

  return useMutation({
    mutationKey: ['addBoard'],
    mutationFn: boardService.addNewBoard,
    meta: { invalidates: [['boards']] },
    onSuccess(data) {
      closeNewBoardModal()
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
