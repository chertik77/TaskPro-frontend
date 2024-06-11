import type { CardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'

import { EditCardModal } from 'components/dashboard/modals'

import { useAppMutation } from 'hooks'

import { cardService } from 'services'

export const useEditCard = (
  cardId: string,
  reset: UseFormReset<CardSchema>
) => {
  const queryClient = useQueryClient()

  const { close } = useModal(EditCardModal)

  return useAppMutation<CardSchema>({
    mutationKey: ['editCard'],
    mutationFn: cardData => cardService.editCard(cardId, cardData),
    toastErrorMessage:
      'Unexpected error during task update. We apologize for the inconvenience. Please try again later.',
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      close()
      reset()
    }
  })
}
