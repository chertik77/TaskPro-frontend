import type { BoardTypes } from '@/entities/board'
import type { CardTypes } from '@/entities/card'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { cardService } from '@/entities/card'

import { useGetParamBoardId } from '@/shared/hooks'

import { EditCardModal } from '../components/EditCardModal'

export const useEditCard = (reset: UseFormReset<CardTypes.CardSchema>) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditCardModal } = useModal(EditCardModal)

  return useMutation({
    mutationKey: ['editCard'],
    mutationFn: ({
      cardId,
      cardData
    }: {
      cardId: string
      cardData: CardTypes.CardSchema
    }) => cardService.editCard(cardId, cardData),
    onMutate: async ({ cardId, cardData }) => {
      await queryClient.cancelQueries({
        queryKey: ['board', boardId]
      })

      closeEditCardModal()
      reset()

      const previousBoard = queryClient.getQueryData<BoardTypes.Board>([
        'board',
        boardId
      ])

      queryClient.setQueryData<BoardTypes.Board>(
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
      queryClient.setQueryData(['board', boardId], context?.previousBoard)
      toast.error(
        'An error occurred while editing the task. Please try again shortly.'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', boardId]
      })
    }
  })
}
