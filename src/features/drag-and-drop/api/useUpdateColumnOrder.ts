import type { Column } from '@/shared/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { updateColumnsOrder } from '@/shared/api'

type UpdateColumnOrderVariables = {
  columns: Column[]
}

export const useUpdateColumnOrder = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const queryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    mutationFn: ({ columns }: UpdateColumnOrderVariables) =>
      updateColumnsOrder({
        path: { boardId },
        body: { ids: columns.map(column => column.id) }
      }),
    onMutate: async ({ columns }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousBoard = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, board => {
        if (!board?.columns) return board

        const byId = new Map(board.columns.map(column => [column.id, column]))

        return {
          ...board,
          columns: columns.map(column => byId.get(column.id) ?? column)
        }
      })

      return { previousBoard }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousBoard)
      queryClient.invalidateQueries({ queryKey })
    },
    meta: {
      errorMessage:
        'Unexpected error during columns reordering. We apologize for the inconvenience. Please try again later.'
    }
  })
}
