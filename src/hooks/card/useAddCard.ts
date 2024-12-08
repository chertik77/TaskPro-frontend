import type { CardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { NewCardModal } from 'components/dashboard/modals'

import { cardService } from 'services'

export const useAddCard = (reset: UseFormReset<CardSchema>) => {
  const queryClient = useQueryClient()

  const { data: column } = useModalInstance<string>()

  const { close } = useModal(NewCardModal)

  return useMutation({
    mutationKey: ['addCard'],
    mutationFn: (data: CardSchema) => cardService.addNewCard(column, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
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
