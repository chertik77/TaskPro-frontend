import type { UpdateOrderData } from 'features/kanban/shared/types'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'
import { useGetParamBoardId } from 'features/kanban/board/hooks'

import { columnService } from '../column.service'
import { ColumnCacheKeys } from '../config'

export const useUpdateColumnsOrder = () => {
  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationKey: [ColumnCacheKeys.UpdateColumnsOrder],
    mutationFn: ({ ids }: UpdateOrderData) =>
      columnService.updateColumnsOrder(boardId!, { ids }),
    meta: { invalidates: [[BoardCacheKeys.Board]] },
    onError() {
      toast.error(
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
