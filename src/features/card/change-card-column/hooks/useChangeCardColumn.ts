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
      //   oldBoard =>
      //     oldBoard && {
      //       ...oldBoard,
      //       columns:
      //         oldBoard.columns &&
      //         oldBoard.columns.map(column => ({
      //           ...column,
      //           cards: column.cards.map(card =>
      //             card.id === cardId ? { ...card, columnId: newColumnId } : card
      //           )
      //         }))
      //     }
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
