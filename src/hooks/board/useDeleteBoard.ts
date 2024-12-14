import type { Board } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { CacheKeys, Pages } from 'config'
import { boardService } from 'services'

import { useGetBoardId } from '.'

export const useDeleteBoard = () => {
  const navigate = useNavigate()

  const boardId = useGetBoardId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [CacheKeys.DeleteBoard],
    mutationFn: () => boardService.deleteBoard(boardId!),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [CacheKeys.Boards] })

      const previousBoards = queryClient.getQueryData<Board[]>([
        CacheKeys.Boards
      ])

      queryClient.setQueryData<Board[]>(
        [CacheKeys.Boards],
        oldBoards => oldBoards && oldBoards.filter(b => b.id !== boardId)
      )

      navigate(Pages.Dashboard, { replace: true })

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([CacheKeys.Boards], context?.previousBoards),
        toast.error(
          'An error occurred while deleting the board. Our technical team has been notified. Please try again shortly.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Boards] })
    }
  })
}
