import type { UpdateOrderData } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from 'services'

export const useUpdateColumnsOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateColumnsOrder'],
    mutationFn: ({ boardId, ids }: UpdateOrderData & { boardId: string }) =>
      columnService.updateColumnsOrder(boardId, { ids }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    onError() {
      toast.error(
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
