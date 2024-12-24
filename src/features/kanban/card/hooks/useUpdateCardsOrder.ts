import type { UpdateOrderData } from 'features/kanban/shared/types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BoardCacheKeys } from 'features/kanban/board/config'
import { toast } from 'sonner'

import { cardService } from '../card.service'
import { CardCacheKeys } from '../config'

export const useUpdateCardsOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [CardCacheKeys.UpdateCardsOrder],
    mutationFn: ({ columnId, ids }: UpdateOrderData & { columnId: string }) =>
      cardService.updateCardsOrder(columnId, { ids }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Board] })
    },
    onError() {
      toast.error(
        'Unexpected error during cards reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
