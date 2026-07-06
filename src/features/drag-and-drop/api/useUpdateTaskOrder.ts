import { useMutation } from '@tanstack/react-query'

import { useGetParamBoardId } from '@/entities/board'

import { getBoardByIdQueryKey, updateTasksOrderMutation } from '@/shared/api'

export const useUpdateTaskOrder = () => {
  const boardId = useGetParamBoardId()

  return useMutation({
    ...updateTasksOrderMutation(),
    meta: {
      invalidates: [getBoardByIdQueryKey({ path: { boardId } })],
      errorMessage:
        'Unexpected error during tasks reordering. We apologize for the inconvenience. Please try again later.'
    }
  })
}
