import { useQueryClient } from '@tanstack/react-query'

import { useAppMutation } from 'hooks'

import { cardService } from 'services'

export const useChangeCardColumn = (cardId: string) => {
  const queryClient = useQueryClient()

  return useAppMutation<string>({
    mutationKey: ['changeCardColumn'],
    mutationFn: columnId => cardService.changeCardColumn(cardId, columnId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    toastErrorMessage:
      'Unexpected error during column changing. We apologize for the inconvenience. Please try again later.'
  })
}
