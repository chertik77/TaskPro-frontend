import type { UpdateOrderData } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGetBoardId } from 'hooks/board'

import { CacheKeys } from 'config'
import { columnService } from 'services'

export const useUpdateColumnsOrder = () => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [CacheKeys.UpdateColumnsOrder],
    mutationFn: ({ ids }: UpdateOrderData) =>
      columnService.updateColumnsOrder(boardId, { ids }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board, boardId] })
    },
    onError() {
      toast.error(
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
