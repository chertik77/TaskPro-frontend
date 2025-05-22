import type { BoardTypes } from '@/entities/board'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/shared/api/card'
import { useGetParamBoardId } from '@/shared/hooks'

import { addMovedCardToColumn } from '../utils/addMovedCardToColumn'
import { getMovedCard } from '../utils/getMovedCard'

export const useMoveCard = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: cardService.moveCard,
    onMutate: async ({ cardId, newColumnId }) => {
      await queryClient.cancelQueries({
        queryKey: ['board', boardId]
      })

      const previousBoard = queryClient.getQueryData<BoardTypes.BoardSchema>([
        'board',
        boardId
      ])

      queryClient.setQueryData<BoardTypes.BoardSchema>(
        ['board', boardId],
        oldBoard => {
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
        }
      )

      return { previousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['board', boardId], context?.previousBoard)
      toast.error(
        'An error occurred while moving the task. Please try again shortly.'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', boardId]
      })
    }
  })
}
