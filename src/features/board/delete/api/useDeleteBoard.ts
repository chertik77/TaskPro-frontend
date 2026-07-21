import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { array, parse } from 'valibot'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

import { deleteBoard, vBoard } from '@/shared/api'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const navigate = useNavigate()

  const allBoardsQueryKey = boardQueries.lists()

  return useMutation({
    mutationFn: () => deleteBoard({ path: { boardId } }),
    meta: {
      errorMessage:
        'An error occurred while deleting the board. Please try again.'
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: allBoardsQueryKey })

      const previousBoards = queryClient.getQueryData(allBoardsQueryKey)

      const parsedPreviousBoards = parse(array(vBoard), previousBoards)

      queryClient.setQueryData(allBoardsQueryKey, oldBoards => {
        if (!oldBoards) return oldBoards

        const parsedOldBoards = parse(array(vBoard), oldBoards)

        return parsedOldBoards.filter(b => b.id !== boardId)
      })

      navigate({ to: '/dashboard', replace: true })

      return { previousBoards: parsedPreviousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(allBoardsQueryKey, context?.previousBoards)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allBoardsQueryKey })
    }
  })
}
