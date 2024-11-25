import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from 'services'

export const useUpdateCardsOrder = () =>
  useMutation({
    mutationKey: ['updateCardsOrder'],
    mutationFn: ({ columnId, ids }: { ids: string[]; columnId: string }) =>
      cardService.updateCardsOrder(columnId, { ids }),
    onError() {
      toast.error(
        'Unexpected error during cards reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
