import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from 'services'

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteColumn'],
    mutationFn: (columnId: string) => columnService.deleteColumn(columnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
    onError: () => {
      toast.error(
        'Unexpected error during column deletion. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
