import type { BoardSchemaFields } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardService } from 'services/board.service'

export const useAddNewBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['addBoard'],
    mutationFn: (data: BoardSchemaFields) => boardService.addNewBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    }
  })
}
