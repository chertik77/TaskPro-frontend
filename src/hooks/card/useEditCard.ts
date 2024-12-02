import type { CardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { Board } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditCardModal } from 'components/dashboard/modals'

import { useGetBoardId } from 'hooks/board'

import { cardService } from 'services'

export const useEditCard = (reset: UseFormReset<CardSchema>) => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  const { close } = useModal(EditCardModal)

  return useMutation({
    mutationKey: ['editCard'],
    mutationFn: ({
      cardId,
      cardData
    }: {
      cardId: string
      cardData: CardSchema
    }) => cardService.editCard(cardId, cardData),
    onMutate: async ({ cardId, cardData }) => {
      await queryClient.cancelQueries({ queryKey: ['board', boardId] })

      close()
      reset()

      const previousBoard = queryClient.getQueryData<Board>(['board', boardId])

      queryClient.setQueryData<Board>(
        ['board', boardId],
        oldBoard =>
          oldBoard && {
            ...oldBoard,
            columns: oldBoard.columns.map(column => ({
              ...column,
              cards: column.cards.map(card =>
                card.id === cardId ? { ...card, ...cardData } : card
              )
            }))
          }
      )

      return { previousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['board', boardId], context?.previousBoard),
        toast.error(
          'Unexpected error during task update. We apologize for the inconvenience. Please try again later.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    }
  })
}
