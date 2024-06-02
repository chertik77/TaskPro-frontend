import type { ColumnTitle } from 'types'

import { useQueryClient } from '@tanstack/react-query'

import { useAppMutation } from 'hooks/useAppMutation'

import { columnService } from 'services'

export const useEditColumn = (columnId: string) => {
  const queryClient = useQueryClient()

  return useAppMutation<ColumnTitle>({
    mutationKey: ['editColumn'],
    mutationFn: data => columnService.editColumn(columnId, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    toastErrorMessage:
      'Unexpected error during column update. We apologize for the inconvenience. Please try again later.'
  })
}
