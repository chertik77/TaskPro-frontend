import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDragAndDrop } from 'context/dnd.context'

import { CacheKeys } from 'config'
import { cardService } from 'services'

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  const { setCards } = useDragAndDrop()

  return useMutation({
    mutationKey: [CacheKeys.DeleteCard],
    mutationFn: (cardId: string) => cardService.deleteCard(cardId),
    onMutate: async cardId => {
      setCards(prevCards => prevCards?.filter(c => c.id !== cardId))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board] })
    }
  })
}
