import type { UseFormReset } from 'react-hook-form'
import type { BoardSchema } from '../board.schema'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { boardService } from '../board.service'
import { NewBoardModal } from '../components/modals'
import { BoardCacheKeys } from '../config'

export const useAddBoard = (reset: UseFormReset<BoardSchema>) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { close: closeNewBoardModal } = useModal(NewBoardModal)

  return useMutation({
    mutationKey: [BoardCacheKeys.AddBoard],
    mutationFn: boardService.addNewBoard,
    onSuccess(data) {
      closeNewBoardModal()
      reset()
      navigate({ to: `/dashboard/$boardId`, params: { boardId: data.id } })
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Boards] })
    },
    onError() {
      toast.error(
        'An error occurred while creating the board. Please try again shortly.'
      )
    }
  })
}
