import type { ColumnTitle } from '../column.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'

import { columnService } from '../column.service'
import { ColumnCacheKeys } from '../config'

export const useEditColumn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [ColumnCacheKeys.EditColumn],
    mutationFn: ({ columnId, data }: { columnId: string; data: ColumnTitle }) =>
      columnService.editColumn(columnId, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Board] })
    },
    onError() {
      toast.error(
        'Unexpected error during column update. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
