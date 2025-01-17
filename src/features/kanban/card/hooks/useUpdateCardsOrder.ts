import type { UpdateOrderData } from 'shared/types'

import { useMutation } from '@tanstack/react-query'
import { cardService } from 'shared/api/card'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'

import { CardCacheKeys } from '../config'

export const useUpdateCardsOrder = () =>
  useMutation({
    mutationKey: [CardCacheKeys.UpdateCardsOrder],
    mutationFn: ({ columnId, ids }: UpdateOrderData & { columnId: string }) =>
      cardService.updateCardsOrder(columnId, { ids }),
    meta: { invalidates: [[BoardCacheKeys.Board]] },
    onError() {
      toast.error(
        'Unexpected error during cards reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
