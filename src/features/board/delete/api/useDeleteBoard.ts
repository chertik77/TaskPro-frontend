import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { deleteBoard } from '@/shared/api'
import { setOptimisticData } from '@/shared/lib'

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
    onMutate: () =>
      setOptimisticData(queryClient, allBoardsQueryKey, boards =>
        boards.filter(b => b.id !== boardId)
      ),
    onSuccess: () => {
      navigate({ to: '/dashboard', replace: true })
    },
    onError: (_, __, context) => context?.rollback(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allBoardsQueryKey })
    }
  })
}
