import type { ColumnDtoTypes } from '@/entities/column'

import { useMutation } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'
import { columnService } from '@/entities/column'

export const useUpdateColumnOrder = () => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: ({ ids }: Omit<ColumnDtoTypes.UpdateColumnDto, 'boardId'>) =>
      columnService.updateColumnOrder({ boardId, ids }),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
    }
  })
}
