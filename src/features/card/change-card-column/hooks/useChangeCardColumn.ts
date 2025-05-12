import type { BoardTypes } from '@/entities/board'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/shared/api/card'
import { useGetParamBoardId } from '@/shared/hooks'

export const useChangeCardColumn = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: cardService.changeCardColumn,
    onMutate: async ({ cardId, newColumnId }) => {
      await queryClient.cancelQueries({
        queryKey: ['board', boardId]
      })

      const previousBoard = queryClient.getQueryData<BoardTypes.BoardSchema>([
        'board',
        boardId
      ])

      console.log(cardId)
      console.log(newColumnId)

      // queryClient.setQueryData<BoardTypes.BoardSchema>(
      //   ['board', boardId],
      //   oldBoard => {
      //     if (!oldBoard) return oldBoard

      //     let movedCard: BoardTypes.Card | null = null

      //     // Remove card from old column
      //     const columnsWithoutCard = oldBoard.columns.map(column => {
      //       if (column.cards.some(card => card.id === cardId)) {
      //         movedCard = column.cards.find(card => card.id === cardId) || null

      //         return {
      //           ...column,
      //           cards: column.cards.filter(card => card.id !== cardId)
      //         }
      //       }

      //       return column
      //     })

      //     if (!movedCard) return oldBoard // card not found, no change

      //     // Update card's columnId
      //     movedCard = { ...movedCard, columnId: newColumnId }

      //     // Add card to new column
      //     const updatedColumns = columnsWithoutCard.map(column => {
      //       if (column.id === newColumnId) {
      //         return {
      //           ...column,
      //           cards: [...column.cards, movedCard!]
      //         }
      //       }

      //       return column
      //     })

      //     return {
      //       ...oldBoard,
      //       columns: updatedColumns
      //     }
      //   }
      // )

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
