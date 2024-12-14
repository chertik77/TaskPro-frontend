import type { BoardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { NewBoardModal } from 'components/dashboard/modals'

import { CacheKeys, Pages } from 'config'
import { boardService } from 'services'

export const useAddBoard = (reset: UseFormReset<BoardSchema>) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { close } = useModal(NewBoardModal)

  return useMutation({
    mutationKey: [CacheKeys.AddBoard],
    mutationFn: boardService.addNewBoard,
    onSuccess(data) {
      close()
      reset()
      navigate(`${Pages.Dashboard}/${data.id}`)
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Boards] })
    },
    onError() {
      toast.error(
        'Unexpected error during board creation. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
