import { useQueryClient } from '@tanstack/react-query'

import { useAppMutation } from 'hooks/useAppMutation'

import { cardService } from 'services'

export const useDeleteCard = (cardId: string) => {
  const queryClient = useQueryClient()

  return useAppMutation({
    mutationKey: ['deleteCard'],
    mutationFn: () => cardService.deleteCard(cardId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    toastErrorMessage:
      'An error occurred while deleting the task. Our technical team has been notified. Please try again shortly.'
  })
}
