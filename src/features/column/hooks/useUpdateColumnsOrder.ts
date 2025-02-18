import type { UpdateOrderData } from '@/shared/types'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from '@/entities/column'

import { useGetParamBoardId } from '@/shared/hooks'

export const useUpdateColumnsOrder = () => {
  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationKey: ['updateColumnsOrder'],
    mutationFn: ({ ids }: UpdateOrderData) =>
      columnService.updateColumnsOrder(boardId!, { ids }),
    meta: { invalidates: [['board']] },
    onError() {
      toast.error(
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
