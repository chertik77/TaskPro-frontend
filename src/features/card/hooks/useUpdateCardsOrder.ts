import type { UpdateOrderData } from '@/shared/types'

import { cardService } from '@/entities/card'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateCardsOrder = () =>
  useMutation({
    mutationKey: ['updateCardsOrder'],
    mutationFn: ({ columnId, ids }: UpdateOrderData & { columnId: string }) =>
      cardService.updateCardsOrder(columnId, { ids }),
    meta: { invalidates: [['board']] },
    onError() {
      toast.error(
        'Unexpected error during cards reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
