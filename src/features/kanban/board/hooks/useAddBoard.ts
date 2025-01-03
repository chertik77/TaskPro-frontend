import type { UseFormReset } from 'react-hook-form'
import type { BoardSchema } from '../board.schema'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Pages } from 'config'

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
      navigate(`${Pages.Dashboard}/${data.id}`)
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Boards] })
    },
    onError() {
      toast.error(
        'An error occurred while creating the board. Please try again shortly.'
      )
    }
  })
}
