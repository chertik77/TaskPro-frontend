import type { BoardTypes } from '@/entities/board'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { boardQueries } from '@/entities/board'

import { boardService } from '@/shared/api/board'
import { useGetParamBoardId } from '@/shared/hooks'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => boardService.deleteBoard({ boardId: boardId! }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: boardQueries.boardsKey() })

      const previousBoards = queryClient.getQueryData<BoardTypes.BoardsSchema>(
        boardQueries.boardsKey()
      )

      queryClient.setQueryData<BoardTypes.BoardsSchema>(
        boardQueries.boardsKey(),
        oldBoards => oldBoards && oldBoards.filter(b => b.id !== boardId)
      )

      navigate({ to: '/dashboard', replace: true })

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        boardQueries.boardsKey(),
        context?.previousBoards
      )
      toast.error(
        'An error occurred while deleting the board. Please try again shortly.'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: boardQueries.board(boardId).queryKey
      })
    }
  })
}
