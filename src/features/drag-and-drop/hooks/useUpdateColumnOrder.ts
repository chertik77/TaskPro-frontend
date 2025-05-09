import type { ColumnDtoTypes } from '@/shared/api/column'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from '@/shared/api/column'
import { useGetParamBoardId } from '@/shared/hooks'

export const useUpdateColumnOrder = () => {
  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: ({ ids }: Omit<ColumnDtoTypes.UpdateColumnDto, 'boardId'>) =>
      columnService.updateColumnOrder({ boardId, ids }),
    meta: { invalidates: [['board']] },
    onError() {
      toast.error(
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
