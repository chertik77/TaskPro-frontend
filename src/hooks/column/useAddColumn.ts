import { useQueryClient } from '@tanstack/react-query'

import { useAppMutation } from 'hooks'
import { useGetBoardId } from 'hooks/board'

import { DEFAULT_COLUMN_TITLE } from 'constants/titles'
import { columnService } from 'services'

export const useAddColumn = () => {
  const boardId = useGetBoardId()

  const queryClient = useQueryClient()

  return useAppMutation({
    mutationKey: ['addColumn'],
    mutationFn: () =>
      columnService.addNewColumn(boardId!, { title: DEFAULT_COLUMN_TITLE }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    toastErrorMessage:
      'Unexpected error during column addition. We apologize for the inconvenience. Please try again later.'
  })
}
