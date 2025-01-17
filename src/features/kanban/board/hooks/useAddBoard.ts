import type { BoardTypes } from '@/shared/api/board'
import type { UseFormReset } from 'react-hook-form'

import { boardService } from '@/shared/api/board'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { NewBoardModal } from '../components/modals'

export const useAddBoard = (reset: UseFormReset<BoardTypes.BoardSchema>) => {
  const navigate = useNavigate()

  const { close: closeNewBoardModal } = useModal(NewBoardModal)

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
