import type { CardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { Board } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditCardModal } from 'components/dashboard/modals'

import { useGetBoardId } from 'hooks/board'

import { CacheKeys } from 'config'
import { cardService } from 'services'

export const useEditCard = (reset: UseFormReset<CardSchema>) => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  const { close } = useModal(EditCardModal)

  return useMutation({
    mutationKey: [CacheKeys.EditCard],
    mutationFn: ({
      cardId,
      cardData
    }: {
      cardId: string
      cardData: CardSchema
    }) => cardService.editCard(cardId, cardData),
    onMutate: async ({ cardId, cardData }) => {
      await queryClient.cancelQueries({ queryKey: [CacheKeys.Board, boardId] })

      close()
      reset()

      const previousBoard = queryClient.getQueryData<Board>([
        CacheKeys.Board,
        boardId
      ])

      queryClient.setQueryData<Board>(
        [CacheKeys.Board, boardId],
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
      queryClient.setQueryData(
        [CacheKeys.Board, boardId],
        context?.previousBoard
      ),
        toast.error(
          'Unexpected error during task update. We apologize for the inconvenience. Please try again later.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board, boardId] })
    }
  })
}
