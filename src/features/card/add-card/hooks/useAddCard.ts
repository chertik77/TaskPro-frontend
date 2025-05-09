import type { CardTypes } from '@/entities/card'
import type { CardDtoTypes } from '@/shared/api/card'
import type { UseFormReset } from 'react-hook-form'
import type { AddCardSchema } from '../add-card.contract'

import { useMutation } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { cardService } from '@/shared/api/card'

import { AddCardModal } from '../components/AddCardModal'

export const useAddCard = (reset: UseFormReset<AddCardSchema>) => {
  const {
    data: { columnId }
  } = useModalInstance<CardTypes.AddCardModalSchema>()

  const { close: closeAddCardModal } = useModal(AddCardModal)

  return useMutation({
    mutationFn: (data: Omit<CardDtoTypes.AddCardDto, 'columnId'>) =>
      cardService.addNewCard({ columnId, ...data }),
    meta: { invalidates: [['board']] },
    onSuccess() {
      closeAddCardModal()
      reset()
    },
    onError(e) {
      toast.error(
        'An error occurred while creating the task. Please try again shortly.'
      )
      console.error(e)
    }
  })
}
