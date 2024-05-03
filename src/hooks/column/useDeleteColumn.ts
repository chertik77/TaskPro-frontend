import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { columnService } from 'services/column.service'

export const useDeleteColumn = (columnId: string) => {
  const queryClient = useQueryClient()

  const { boardId } = useParams()

  return useMutation({
    mutationKey: ['deleteColumn'],
    mutationFn: () => columnService.deleteColumn(boardId!, columnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      toast.success('Column has been deleted successfully!')
    }
  })
}
