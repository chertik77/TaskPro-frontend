import type { Board } from '../board.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { boardService } from '../board.service'
import { BoardCacheKeys } from '../config'
import { useGetParamBoardId } from './useGetParamBoardId'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const navigate = useNavigate()

  return useMutation({
    mutationKey: [BoardCacheKeys.DeleteBoard],
    mutationFn: () => boardService.deleteBoard(boardId!),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [BoardCacheKeys.Boards] })

      const previousBoards = queryClient.getQueryData<Board[]>([
        BoardCacheKeys.Boards
      ])

      queryClient.setQueryData<Board[]>(
        [BoardCacheKeys.Boards],
        oldBoards => oldBoards && oldBoards.filter(b => b.id !== boardId)
      )

      navigate({ to: '/dashboard', replace: true })

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [BoardCacheKeys.Boards],
        context?.previousBoards
      ),
        toast.error(
          'An error occurred while deleting the board. Please try again shortly.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Boards] })
    }
  })
}
