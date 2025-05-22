import type { BoardTypes } from '@/entities/board'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import type { EditCardSchema } from '../edit-card.contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/shared/api/card'
import { useGetParamBoardId } from '@/shared/hooks'

export const useEditCard = (
  reset: UseFormReset<EditCardSchema>,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: cardService.editCard,
    onMutate: async ({ cardId, ...cardData }) => {
      await queryClient.cancelQueries({
        queryKey: ['board', boardId]
      })

      const previousBoard = queryClient.getQueryData<BoardTypes.BoardSchema>([
        'board',
        boardId
      ])

      queryClient.setQueryData<BoardTypes.BoardSchema>(
        ['board', boardId],
        oldBoard =>
          oldBoard && {
            ...oldBoard,
            columns:
              oldBoard.columns &&
              oldBoard.columns.map(column => ({
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
    onSuccess: () => {
      setIsDialogOpen(false)
      reset()
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', boardId]
      })
    }
  })
}
