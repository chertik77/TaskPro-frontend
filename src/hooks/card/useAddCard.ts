import type { CardSchemaFields } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModalInstance } from 'react-modal-state'

import { useBoardByLocation } from 'hooks/useBoardByLocation'

import { cardService } from 'services/card.service'

export const useAddCard = () => {
  const queryClient = useQueryClient()

  const boardId = useBoardByLocation()

  const { data: column } = useModalInstance<string>()

  return useMutation({
    mutationKey: ['card'],
    mutationFn: (data: CardSchemaFields) =>
      cardService.addNewCard(boardId!, column, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    }
  })
}
