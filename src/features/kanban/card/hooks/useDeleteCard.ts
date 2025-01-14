import { useMutation } from '@tanstack/react-query'

import { BoardCacheKeys } from 'features/kanban/board/config'
import { useDragAndDrop } from 'features/kanban/dnd/hooks'

import { cardService } from '../card.service'
import { CardCacheKeys } from '../config'

export const useDeleteCard = () => {
  const { setCards } = useDragAndDrop()

  return useMutation({
    mutationKey: [CardCacheKeys.DeleteCard],
    mutationFn: (cardId: string) => cardService.deleteCard(cardId),
    meta: { invalidates: [[BoardCacheKeys.Board]] },
    onMutate: async cardId => {
      setCards(prevCards => prevCards?.filter(c => c.id !== cardId))
    }
  })
}
