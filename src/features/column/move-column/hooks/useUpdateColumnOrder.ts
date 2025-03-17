import type { UpdateOrderData } from '@/shared/types'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from '@/entities/column'

import { useGetParamBoardId } from '@/shared/hooks'

export const useUpdateColumnOrder = () => {
  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: ({ ids }: UpdateOrderData) =>
      columnService.updateColumnOrder(boardId!, { ids }),
    meta: { invalidates: [['board']] },
    onError() {
      toast.error(
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
