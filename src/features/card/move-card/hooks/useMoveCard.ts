import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

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

      queryClient.setQueryData(boardQueryKey, oldBoard => {
        if (!oldBoard) return oldBoard

        const updatedColumns = oldBoard.columns?.map(column => ({
          ...column,
          cards: column.cards.filter(card => card.id !== cardId)
        }))

        const movedCard = getMovedCard(oldBoard.columns!, cardId)

        const finalColumns = addMovedCardToColumn(
          updatedColumns!,
          newColumnId,
          movedCard!
        )

        return {
          ...oldBoard,
          columns: finalColumns
        }
      })

      return { previousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(boardQueryKey, context?.previousBoard)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKey })
    }
  })
}
