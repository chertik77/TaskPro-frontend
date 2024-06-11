import type { BoardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { Board } from 'types'

import { useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'

import { NewBoardModal } from 'components/dashboard/modals'

import { useAppMutation } from 'hooks'

import { Pages } from 'config'
import { boardService } from 'services'

export const useAddBoard = (reset: UseFormReset<BoardSchema>) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { close } = useModal(NewBoardModal)

  return useAppMutation<BoardSchema, Board>({
    mutationKey: ['addBoard'],
    mutationFn: boardService.addNewBoard,
    toastErrorMessage:
      'Unexpected error during board creation. We apologize for the inconvenience. Please try again later.',
    onSuccess(data) {
      close()
      reset()
      navigate(`${Pages.Dashboard}/${data.id}`)
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    }
  })
}
