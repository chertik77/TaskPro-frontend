import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import {
  BoardContracts,
  boardQueries,
  useGetParamBoardId
} from '@/entities/board'
import { cardService } from '@/entities/card'
import { ColumnContracts } from '@/entities/column'

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.board(boardId).queryKey

  return useMutation({
    mutationKey: ['deleteCard'],
    mutationFn: cardService.deleteCard,
    meta: {
      errorMessage:
        'An error occurred while deleting the card. Please try again shortly.'
    },
    onMutate: async ({ cardId }) => {
      await queryClient.cancelQueries({ queryKey: boardQueryKey })

      const previousBoard = queryClient.getQueryData(boardQueryKey)

      const parsedPreviousBoard = parse(
        BoardContracts.BoardSchema,
        previousBoard
      )

      queryClient.setQueryData(boardQueryKey, oldBoard => {
        if (!oldBoard) return oldBoard

        const parsedOldBoard = parse(BoardContracts.BoardSchema, oldBoard)

        return {
          ...oldBoard,
          columns: parsedOldBoard.columns.map(column => {
            const parsedColumn = parse(ColumnContracts.ColumnSchema, column)

            return {
              ...column,
              cards: parsedColumn.cards.filter(card => card.id !== cardId)
            }
          })
        }
      })

      return { previousBoard: parsedPreviousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(boardQueryKey, context?.previousBoard)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKey })
    }
  })
}
