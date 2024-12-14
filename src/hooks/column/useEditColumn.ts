import type { ColumnTitle } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGetBoardId } from 'hooks/board'

import { CacheKeys } from 'config'
import { columnService } from 'services'

export const useEditColumn = () => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [CacheKeys.EditColumn],
    mutationFn: ({ columnId, data }: { columnId: string; data: ColumnTitle }) =>
      columnService.editColumn(columnId, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board, boardId] })
    },
    onError() {
      toast.error(
        'Unexpected error during column update. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
