import type { CardTypes } from '@/entities/card'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { cardService } from '@/entities/card'

import { AddCardModal } from '../components/AddCardModal'

export const useAddCard = (reset: UseFormReset<CardTypes.CardSchema>) => {
  const {
    data: { columnId }
  } = useModalInstance<CardTypes.AddCardModalProps>()

  const { close: closeAddCardModal } = useModal(AddCardModal)

  return useMutation({
    mutationFn: (data: CardTypes.CardSchema) =>
      cardService.addNewCard(columnId, data),
    meta: { invalidates: [['board']] },
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
