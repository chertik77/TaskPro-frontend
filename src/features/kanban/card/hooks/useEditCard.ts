import type { BoardTypes } from '@/shared/api/board'
import type { CardTypes } from '@/shared/api/card'
import type { UseFormReset } from 'react-hook-form'

import { BoardCacheKeys } from '@/features/kanban/board/config'
import { useGetParamBoardId } from '@/features/kanban/board/hooks'
import { cardService } from '@/shared/api/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditCardModal } from '../components/modals'
import { CardCacheKeys } from '../config'

export const useEditCard = (reset: UseFormReset<CardTypes.CardSchema>) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditCardModal } = useModal(EditCardModal)

  return useMutation({
    mutationKey: [CardCacheKeys.EditCard],
    mutationFn: ({
      cardId,
      cardData
    }: {
      cardId: string
      cardData: CardTypes.CardSchema
    }) => cardService.editCard(cardId, cardData),
    onMutate: async ({ cardId, cardData }) => {
      await queryClient.cancelQueries({
        queryKey: [BoardCacheKeys.Board, boardId]
      })

      closeEditCardModal()
      reset()

      const previousBoard = queryClient.getQueryData<BoardTypes.Board>([
        BoardCacheKeys.Board,
        boardId
      ])

      queryClient.setQueryData<BoardTypes.Board>(
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
          'An error occurred while editing the task. Please try again shortly.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BoardCacheKeys.Board, boardId]
      })
    }
  })
}
