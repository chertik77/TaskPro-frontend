import { useMutation } from '@tanstack/react-query'

// import { useDragAndDrop } from '@/features/drag-and-drop'

import { cardService } from '@/shared/api/card'

// eslint-disable-next-line arrow-body-style
export const useDeleteCard = () => {
  // const { setCards } = useDragAndDrop()

  return useMutation({
    mutationFn: cardService.deleteCard,
    meta: { invalidates: [['board']] }
    // onMutate: async ({ cardId }) => {
    //   setCards(prevCards => prevCards?.filter(c => c.id !== cardId))
    // }
  })
}
