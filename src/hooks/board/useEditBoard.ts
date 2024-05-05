import type { BoardSchemaFields } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useBoardByLocation } from 'hooks/useBoardByLocation'

import { boardService } from 'services/board.service'

export const useEditBoard = () => {
  const boardId = useBoardByLocation()

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['edit board'],
    mutationFn: (data: BoardSchemaFields) =>
      boardService.editBoard(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    }
  })
}
