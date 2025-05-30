import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { cardService } from '@/shared/api/card'
import { useGetParamBoardId } from '@/shared/hooks'

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

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

      queryClient.setQueryData(
        boardQueryKey,
        oldBoard =>
          oldBoard && {
            ...oldBoard,
            columns:
              oldBoard.columns &&
              oldBoard.columns.map(column => ({
                ...column,
                cards: column.cards.filter(card => card.id !== cardId)
              }))
          }
      )

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
