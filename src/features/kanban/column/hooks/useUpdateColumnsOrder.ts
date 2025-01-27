import type { UpdateOrderData } from '@/shared/types'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGetParamBoardId } from '@/features/kanban/board/hooks'

import { columnService } from '@/shared/api/column'

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
