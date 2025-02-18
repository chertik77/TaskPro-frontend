import type { UpdateOrderData } from '@/shared/types'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/entities/card'

export const useUpdateCardOrder = () =>
  useMutation({
    mutationKey: ['updateCardOrder'],
    mutationFn: ({ columnId, ids }: UpdateOrderData & { columnId: string }) =>
      cardService.updateCardOrder(columnId, { ids }),
    meta: { invalidates: [['board']] },
    onError() {
      toast.error(
        'Unexpected error during cards reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
