import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from 'services'

export const useChangeCardColumn = (cardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['changeCardColumn'],
    mutationFn: (columnId: string) =>
      cardService.changeCardColumn(cardId, columnId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    onError() {
      toast.error(
        'Unexpected error during column changing. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
