import type { UpdateColumnsOrderData } from '@/shared/api'

import { useMutation } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { updateColumnsOrder } from '@/shared/api'

export const useUpdateColumnOrder = () => {
  const boardId = useGetParamBoardId()

  return useMutation({
    mutationFn: ({ ids }: UpdateColumnsOrderData['body']) =>
      updateColumnsOrder({ path: { boardId }, body: { ids } }),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
    }
  })
}
