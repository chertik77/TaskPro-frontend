import type { UpdateOrderData } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { CacheKeys } from 'config'
import { cardService } from 'services'

export const useUpdateCardsOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [CacheKeys.UpdateCardsOrder],
    mutationFn: ({ columnId, ids }: UpdateOrderData & { columnId: string }) =>
      cardService.updateCardsOrder(columnId, { ids }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board] })
    },
    onError() {
      toast.error(
        'Unexpected error during cards reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
