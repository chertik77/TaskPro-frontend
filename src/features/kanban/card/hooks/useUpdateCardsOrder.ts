import type { UpdateOrderData } from 'features/kanban/shared/types'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'

import { cardService } from '../card.service'
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
