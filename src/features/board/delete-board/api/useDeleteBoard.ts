import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { parse } from 'valibot'

import {
  BoardContracts,
  boardQueries,
  boardService,
  useGetParamBoardId
} from '@/entities/board'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => boardService.deleteBoard({ boardId }),
    meta: {
      errorMessage:
        'An error occurred while deleting the board. Please try again shortly.'
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: boardQueries.lists() })

      const previousBoards = queryClient.getQueryData(boardQueries.lists())

      const parsedPreviousBoards = parse(
        BoardContracts.BoardsSchema,
        previousBoards
      )

      queryClient.setQueryData(boardQueries.lists(), oldBoards => {
        if (!oldBoards) return oldBoards

        const parsedOldBoards = parse(BoardContracts.BoardsSchema, oldBoards)

        return parsedOldBoards.filter(b => b.id !== boardId)
      })

      return { previousBoards: parsedPreviousBoards }
    },
    onSuccess: () => {
      navigate({ to: '/dashboard', replace: true })
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(boardQueries.lists(), context?.previousBoards)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueries.lists() })
    }
  })
}
