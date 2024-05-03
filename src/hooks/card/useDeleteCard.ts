import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { cardService } from 'services/card.service'

export const useDeleteCard = (columnId: string, cardId: string) => {
  const queryClient = useQueryClient()

  const { boardId } = useParams()

  return useMutation({
    mutationKey: ['deleteCard'],
    mutationFn: () => cardService.deleteCard(boardId!, columnId, cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      toast.success('Card has been deleted successfully!')
    }
  })
}
