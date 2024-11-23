import type { BoardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditBoardModal } from 'components/dashboard/modals'

import { boardService } from 'services'

export const useEditBoard = (
  boardId: string,
  reset: UseFormReset<BoardSchema>
) => {
  const queryClient = useQueryClient()

  const { close } = useModal(EditBoardModal)

  return useMutation({
    mutationKey: ['editBoard'],
    mutationFn: (data: BoardSchema) => boardService.editBoard(boardId!, data),
    onSuccess(data) {
      close()
      reset()
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      if (data.id === boardId) {
        queryClient.invalidateQueries({ queryKey: ['board'] })
      }
    },
    onError() {
      toast.error(
        'Failed to update the board. Please try again. If the problem persists, contact support.'
      )
    }
  })
}
