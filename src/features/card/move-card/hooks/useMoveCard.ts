import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import { BoardContracts, boardQueries } from '@/entities/board'
import { ColumnContracts } from '@/entities/column'

import { cardService } from '@/shared/api/card'
import { useGetParamBoardId } from '@/shared/hooks'

import { addMovedCardToColumn } from '../utils/addMovedCardToColumn'
import { getMovedCard } from '../utils/getMovedCard'

export const useMoveCard = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const boardQueryKey = boardQueries.board(boardId).queryKey

  return useMutation({
    mutationFn: cardService.moveCard,
    meta: {
      errorMessage:
        'An error occurred while moving the task. Please try again shortly.'
    },
    onMutate: async ({ cardId, newColumnId }) => {
      await queryClient.cancelQueries({ queryKey: boardQueryKey })

      const previousBoard = queryClient.getQueryData(boardQueryKey)

      const parsedPreviousBoard = parse(
        BoardContracts.BoardSchema,
        previousBoard
      )

      queryClient.setQueryData(boardQueryKey, oldBoard => {
        if (!oldBoard) return oldBoard

        const parsedOldBoard = parse(BoardContracts.BoardSchema, oldBoard)

        const updatedColumns = parsedOldBoard.columns.map(column => {
          const parsedColumn = parse(ColumnContracts.ColumnSchema, column)

          return {
            ...column,
            cards: parsedColumn.cards.filter(card => card.id !== cardId)
          }
        })

        const movedCard = getMovedCard(parsedOldBoard.columns, cardId)

        const finalColumns = addMovedCardToColumn(
          updatedColumns,
          newColumnId,
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
