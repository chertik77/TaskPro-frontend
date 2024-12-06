import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from 'services'

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteCard'],
    mutationFn: (cardId: string) => cardService.deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    onError: () => {
      toast.error(
        'An error occurred while deleting the task. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
}
