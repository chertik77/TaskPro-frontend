import type { Board } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGetBoardId } from 'hooks/board'

import { cardService } from 'services'

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: ['deleteCard'],
    mutationFn: (cardId: string) => cardService.deleteCard(cardId),
    onMutate: async cardId => {
      await queryClient.cancelQueries({ queryKey: ['board', boardId] })

      const previousBoard = queryClient.getQueryData<Board>(['board', boardId])

      queryClient.setQueryData<Board>(
        ['board', boardId],
        oldBoard =>
          oldBoard && {
            ...oldBoard,
            columns: oldBoard.columns.map(column => ({
              ...column,
              cards: column.cards.filter(c => c.id !== cardId)
            }))
          }
      )

      return { previousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['board', boardId], context?.previousBoard),
        toast.error(
          'An error occurred while deleting the task. Our technical team has been notified. Please try again shortly.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    }
  })
}
