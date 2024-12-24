import type { Board } from 'features/kanban/board/board.types'
import type { UseFormReset } from 'react-hook-form'
import type { CardSchema } from '../card.schema'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'
import { useGetBoardId } from 'features/kanban/board/hooks'

import { cardService } from '../card.service'
import { EditCardModal } from '../components/modals'
import { CardCacheKeys } from '../config'

export const useEditCard = (reset: UseFormReset<CardSchema>) => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  const { close } = useModal(EditCardModal)

  return useMutation({
    mutationKey: [CardCacheKeys.EditCard],
    mutationFn: ({
      cardId,
      cardData
    }: {
      cardId: string
      cardData: CardSchema
    }) => cardService.editCard(cardId, cardData),
    onMutate: async ({ cardId, cardData }) => {
      await queryClient.cancelQueries({
        queryKey: [BoardCacheKeys.Board, boardId]
      })

      close()
      reset()

      const previousBoard = queryClient.getQueryData<Board>([
        BoardCacheKeys.Board,
        boardId
      ])

      queryClient.setQueryData<Board>(
        [BoardCacheKeys.Board, boardId],
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
        [BoardCacheKeys.Board, boardId],
        context?.previousBoard
      ),
        toast.error(
          'Unexpected error during task update. We apologize for the inconvenience. Please try again later.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BoardCacheKeys.Board, boardId]
      })
    }
  })
}
