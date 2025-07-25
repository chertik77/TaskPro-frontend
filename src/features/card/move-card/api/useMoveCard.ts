import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import {
  BoardContracts,
  boardQueries,
  useGetParamBoardId
} from '@/entities/board'
import { cardService } from '@/entities/card'

import { addMovedCardToColumn } from '../lib/addMovedCardToColumn'
import { getMovedCard } from '../lib/getMovedCard'

export const useMoveCard = () => {
  const queryClient = useQueryClient()

  const boardId = useGetParamBoardId()

  const boardQueryKey = boardQueries.detail(boardId).queryKey

  return useMutation({
    mutationFn: cardService.editCard,
    meta: {
      errorMessage:
        'An error occurred while moving the task. Please try again shortly.'
    },
    onMutate: async ({ cardId, columnId }) => {
      await queryClient.cancelQueries({ queryKey: boardQueryKey })

      const previousBoard = queryClient.getQueryData(boardQueryKey)

      const parsedPreviousBoard = parse(
        BoardContracts.BoardSchema,
        previousBoard
      )

      queryClient.setQueryData(boardQueryKey, oldBoard => {
        if (!oldBoard) return oldBoard

        const parsedOldBoard = parse(BoardContracts.BoardSchema, oldBoard)

        const updatedColumns = parsedOldBoard.columns.map(column => ({
          ...column,
          cards: column.cards.filter(card => card.id !== cardId)
        }))

        const movedCard = getMovedCard(parsedOldBoard.columns, cardId)

        const finalColumns = addMovedCardToColumn(
          updatedColumns,
          columnId!,
          movedCard!
        )

        return {
          ...oldBoard,
          columns: finalColumns
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
