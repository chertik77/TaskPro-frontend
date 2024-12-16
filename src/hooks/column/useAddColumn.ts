import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGetBoardId } from 'hooks/board'

import { CacheKeys } from 'config'
import { DEFAULT_COLUMN_TITLE } from 'constants/titles'
import { columnService } from 'services'

export const useAddColumn = () => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [CacheKeys.AddColumn],
    mutationFn: () =>
      columnService.addNewColumn(boardId, { title: DEFAULT_COLUMN_TITLE }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board] })
    },
    onError() {
      toast.error(
        'Unexpected error during column addition. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
