import type { ColumnTitle } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from 'services'

export const useEditColumn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['editColumn'],
    mutationFn: ({ columnId, data }: { columnId: string; data: ColumnTitle }) =>
      columnService.editColumn(columnId, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    onError() {
      toast.error(
        'Unexpected error during column update. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
