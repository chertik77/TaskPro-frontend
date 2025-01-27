import { useMutation } from '@tanstack/react-query'

import { useDragAndDrop } from '@/features/kanban/dnd/hooks'

import { cardService } from '@/shared/api/card'

export const useDeleteCard = () => {
  const { setCards } = useDragAndDrop()

  return useMutation({
    mutationKey: ['deleteCard'],
    mutationFn: (cardId: string) => cardService.deleteCard(cardId),
    meta: { invalidates: [['board']] },
    onMutate: async cardId => {
      setCards(prevCards => prevCards?.filter(c => c.id !== cardId))
    }
  })
}
