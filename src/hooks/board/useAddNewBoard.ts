import type { BoardSchemaFields } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { boardService } from 'services/board.service'

export const useAddNewBoard = (reset: UseFormReset<BoardSchemaFields>) => {
  const { close } = useModal('new-board-modal')

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['board'],
    mutationFn: (data: BoardSchemaFields) => boardService.addNewBoard(data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      toast.success('Board successfully added to your collection!')
      close()
      reset()
      navigate(`/dashboard/${data._id}`)
    },
    onError: error => {
      toast.error(
        error.status === 409
          ? 'Conflict occurred. Board with the same title already exists.'
          : 'An error occurred while creating a board. Please try again later.'
      )
    }
  })
}
