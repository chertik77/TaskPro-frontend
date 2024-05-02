import type { BoardSchemaFields } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { useBoardByLocation } from 'hooks/useBoardByLocation'

import { boardService } from 'services/board.service'

export const useEditBoard = (reset: UseFormReset<BoardSchemaFields>) => {
  const boardId = useBoardByLocation()

  const { close } = useModal('edit-board-modal')

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['edit board'],
    mutationFn: (data: BoardSchemaFields) =>
      boardService.editBoard(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      toast.info('The board has been edited successfully.')
      close()
      reset()
    },
    onError: error => {
      toast.error(
        error.status === 409
          ? 'Conflict occurred. Board with the same title already exists.'
          : 'An error occurred while editing a board. Please try again later.'
      )
    }
  })
}
