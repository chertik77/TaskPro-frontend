import type { BoardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { Board } from 'types'

import { useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'

import { EditBoardModal } from 'components/dashboard/modals'

import { useAppMutation, useGetBoardId } from 'hooks'

import { boardService } from 'services'

export const useEditBoard = (reset: UseFormReset<BoardSchema>) => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  const { close } = useModal(EditBoardModal)

  return useAppMutation<BoardSchema, Board>({
    mutationKey: ['editBoard'],
    mutationFn: data => boardService.editBoard(boardId, data),
    toastErrorMessage:
      'Failed to update the board. Please try again. If the problem persists, contact support.',
    onSuccess(data) {
      reset()
      close()
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      if (data.id === boardId) {
        queryClient.invalidateQueries({ queryKey: ['board'] })
      }
    }
  })
}
