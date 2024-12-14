import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGetBoardId } from 'hooks/board'

import { CacheKeys } from 'constants/cache-keys'
import { columnService } from 'services'

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [CacheKeys.DeleteColumn],
    mutationFn: (columnId: string) => columnService.deleteColumn(columnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board, boardId] })
    },
    onError: () => {
      toast.error(
        'Unexpected error during column deletion. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
