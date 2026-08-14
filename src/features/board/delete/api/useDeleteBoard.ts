import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { deleteBoard } from '@/shared/api'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const navigate = useNavigate()

  const allBoardsQueryKey = boardQueries.list().queryKey

  return useMutation({
    mutationFn: () => deleteBoard({ path: { boardId } }),
    meta: {
      errorMessage:
        'An error occurred while deleting the board. Please try again.'
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: allBoardsQueryKey })

      const previousBoards = queryClient.getQueryData(allBoardsQueryKey)

      queryClient.setQueryData(allBoardsQueryKey, oldBoards =>
        oldBoards?.filter(b => b.id !== boardId)
      )

      return { previousBoards }
    },
    onSuccess: () => {
      navigate({ to: '/dashboard', replace: true })
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(allBoardsQueryKey, context?.previousBoards)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allBoardsQueryKey })
    }
  })
}
