import type { CardSchemaFields } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useBoardByLocation } from 'hooks/useBoardByLocation'

import { cardService } from 'services/card.service'

export const useEditCard = (
  columnId: string,
  cardId: string,
  close: () => void
) => {
  const queryClient = useQueryClient()

  const boardId = useBoardByLocation()

  return useMutation({
    mutationKey: ['editCard'],
    mutationFn: (data: CardSchemaFields) =>
      cardService.editCard(boardId!, columnId, cardId, data),
    onSuccess: () => {
      close()
      queryClient.invalidateQueries({ queryKey: ['board'] })
      toast.success('Card has been deleted successfully!')
    }
  })
}
