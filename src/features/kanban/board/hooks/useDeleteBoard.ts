import type { Board } from '../board.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Pages } from 'config'

import { boardService } from '../board.service'
import { BoardCacheKeys } from '../config'
import { useGetBoardId } from './useGetBoardId'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

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

      navigate(Pages.Dashboard, { replace: true })

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [BoardCacheKeys.Boards],
        context?.previousBoards
      ),
        toast.error(
          'An error occurred while deleting the board. Our technical team has been notified. Please try again shortly.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Boards] })
    }
  })
}
