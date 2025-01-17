import type { CardTypes } from '@/shared/api/card'
import type { UseFormReset } from 'react-hook-form'

import { BoardCacheKeys } from '@/features/kanban/board/config'
import { cardService } from '@/shared/api/card'
import { useMutation } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { AddCardModal } from '../components/modals'
import { CardCacheKeys } from '../config'

export const useAddCard = (reset: UseFormReset<CardTypes.CardSchema>) => {
  const {
    data: { columnId }
  } = useModalInstance<CardTypes.AddCardModalProps>()

  const { close: closeAddCardModal } = useModal(AddCardModal)

  return useMutation({
    mutationKey: [CardCacheKeys.AddCard],
    mutationFn: (data: CardTypes.CardSchema) =>
      cardService.addNewCard(columnId, data),
    meta: { invalidates: [[BoardCacheKeys.Board]] },
    onSuccess() {
      closeAddCardModal()
      reset()
    },
    onError() {
      toast.error(
        'An error occurred while creating the task. Please try again shortly.'
      )
    }
  })
}
