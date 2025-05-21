import type { BoardTypes } from '@/entities/board'
import type { CardTypes } from '@/entities/card'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/shared/api/card'
import { useGetParamBoardId } from '@/shared/hooks'

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

          const updatedColumns = oldBoard.columns?.map(column => {
            const cardToUpdate = column.cards.find(card => card.id === cardId)

            if (cardToUpdate) {
              return {
                ...column,
                cards: column.cards.filter(card => card.id !== cardId)
              }
            }

            return column
          })

          let movedCard: CardTypes.CardSchema | undefined

          oldBoard.columns?.forEach(column => {
            const foundCard = column.cards.find(card => card.id === cardId)

            if (foundCard) {
              movedCard = foundCard
            }
          })

          const finalColumns = updatedColumns?.map(column => {
            if (column.id === newColumnId && movedCard) {
              let newOrder = 1

              if (column.cards.length > 0) {
                const maxOrder = Math.max(
                  ...column.cards.map(card => card.order || 0)
                )

                newOrder = maxOrder + 1
              }

              return {
                ...column,
                cards: [
                  ...column.cards,
                  { ...movedCard, columnId: column.id, order: newOrder }
                ]
              }
            }

            return column
          })

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
