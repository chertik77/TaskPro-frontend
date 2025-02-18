import { useMutation } from '@tanstack/react-query'

import { cardService } from '@/entities/card'

import { useDragAndDrop } from '@/shared/store'

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
