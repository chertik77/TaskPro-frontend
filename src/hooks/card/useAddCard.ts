import type { CardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useQueryClient } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'

import { AddCardModal } from 'components/dashboard/modals'

import { useAppMutation } from 'hooks'

import { cardService } from 'services'

export const useAddCard = (reset: UseFormReset<CardSchema>) => {
  const queryClient = useQueryClient()

  const { data: column } = useModalInstance<string>()

  const { close } = useModal(AddCardModal)

  return useAppMutation<CardSchema>({
    mutationKey: ['addCard'],
    mutationFn: data => cardService.addNewCard(column, data),
    toastErrorMessage:
      'Unexpected error during task creation. We apologize for the inconvenience. Please try again later.',
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      close()
      reset()
    }
  })
}
