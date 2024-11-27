import type { UpdateOrderData } from 'types'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from 'services'

export const useUpdateColumnsOrder = () =>
  useMutation({
    mutationKey: ['updateColumnsOrder'],
    mutationFn: ({ boardId, ids }: UpdateOrderData & { boardId: string }) =>
      columnService.updateColumnsOrder(boardId, { ids }),
    onError() {
      toast.error(
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
