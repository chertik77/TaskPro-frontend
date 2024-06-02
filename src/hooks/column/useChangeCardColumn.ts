import { useQueryClient } from '@tanstack/react-query'

import { useAppMutation } from 'hooks/useAppMutation'

import { cardService } from 'services'

export const useChangeCardColumn = (cardId: string) => {
  const queryClient = useQueryClient()

  return useAppMutation<string>({
    mutationKey: ['changeCardColumn'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    mutationFn: columnId => cardService.changeCardColumn(cardId, columnId),
    toastErrorMessage:
      'Unexpected error during column changing. We apologize for the inconvenience. Please try again later.'
  })
}
