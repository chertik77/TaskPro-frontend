import { useMutation, useQueryClient } from '@tanstack/react-query'

import { BoardCacheKeys } from 'features/kanban/board/config'
import { useDragAndDrop } from 'features/kanban/dnd/hooks'

import { cardService } from '../card.service'
import { CardCacheKeys } from '../config'

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  const { setCards } = useDragAndDrop()

  return useMutation({
    mutationKey: [CardCacheKeys.DeleteCard],
    mutationFn: (cardId: string) => cardService.deleteCard(cardId),
    onMutate: async cardId => {
      setCards(prevCards => prevCards?.filter(c => c.id !== cardId))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Board] })
    }
  })
}
