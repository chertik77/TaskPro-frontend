import type { UseFormReset } from 'react-hook-form'
import type { CardSchema } from '../card.schema'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'

import { cardService } from '../card.service'
import { NewCardModal } from '../components/modals'
import { CardCacheKeys } from '../config'

export const useAddCard = (reset: UseFormReset<CardSchema>) => {
  const queryClient = useQueryClient()

  const { data: column } = useModalInstance<string>()

  const { close } = useModal(NewCardModal)

  return useMutation({
    mutationKey: [CardCacheKeys.AddCard],
    mutationFn: (data: CardSchema) => cardService.addNewCard(column, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Board] })
      close()
      reset()
    },
    onError() {
      toast.error(
        'Unexpected error during task creation. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
