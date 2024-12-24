import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BoardCacheKeys } from 'features/kanban/board/config'
import { useGetBoardId } from 'features/kanban/board/hooks'
import { toast } from 'sonner'

import { DEFAULT_COLUMN_TITLE } from '../column.constants'
import { columnService } from '../column.service'
import { ColumnCacheKeys } from '../config'

export const useAddColumn = () => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [ColumnCacheKeys.AddColumn],
    mutationFn: () =>
      columnService.addNewColumn(boardId!, { title: DEFAULT_COLUMN_TITLE }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Board] })
    },
    onError() {
      toast.error(
        'Unexpected error during column addition. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
