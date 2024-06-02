import { useQueryClient } from '@tanstack/react-query'

import { useAppMutation } from 'hooks/useAppMutation'

import { columnService } from 'services'

export const useDeleteColumn = (columnId: string) => {
  const queryClient = useQueryClient()

  return useAppMutation({
    mutationKey: ['deleteColumn'],
    mutationFn: () => columnService.deleteColumn(columnId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    toastErrorMessage:
      'Unexpected error during column deletion. We apologize for the inconvenience. Please try again later.'
  })
}
