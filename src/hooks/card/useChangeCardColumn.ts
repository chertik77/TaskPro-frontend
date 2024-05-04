import type { Card } from 'types/board.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from 'services/card.service'

export const useChangeCardColumn = (card: Card) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['changeCardColumn'],
    mutationFn: (newColumnId: string) =>
      cardService.changeCardColumn(
        card.board!,
        card.column,
        card._id,
        newColumnId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      toast.success('Card has been updated successfully!')
    }
  })
}
