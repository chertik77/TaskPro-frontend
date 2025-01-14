import type { UseFormReset } from 'react-hook-form'
import type { CardSchema } from '../card.schema'
import type { AddCardModalProps } from '../card.types'

import { useMutation } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'

import { cardService } from '../card.service'
import { AddCardModal } from '../components/modals'
import { CardCacheKeys } from '../config'

export const useAddCard = (reset: UseFormReset<CardSchema>) => {
  const {
    data: { columnId }
  } = useModalInstance<AddCardModalProps>()

  const { close: closeAddCardModal } = useModal(AddCardModal)

  return useMutation({
    mutationKey: [CardCacheKeys.AddCard],
    mutationFn: (data: CardSchema) => cardService.addNewCard(columnId, data),
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
