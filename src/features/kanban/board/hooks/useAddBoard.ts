import type { UseFormReset } from 'react-hook-form'
import type { BoardTypes } from 'shared/api/board'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useModal } from 'react-modal-state'
import { boardService } from 'shared/api/board'
import { toast } from 'sonner'

import { NewBoardModal } from '../components/modals'
import { BoardCacheKeys } from '../config'

export const useAddBoard = (reset: UseFormReset<BoardTypes.BoardSchema>) => {
  const navigate = useNavigate()

  const { close: closeNewBoardModal } = useModal(NewBoardModal)

  return useMutation({
    mutationKey: [BoardCacheKeys.AddBoard],
    mutationFn: boardService.addNewBoard,
    meta: { invalidates: [[BoardCacheKeys.Boards]] },
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
