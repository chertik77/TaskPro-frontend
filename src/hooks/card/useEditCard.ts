import type { CardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditCardModal } from 'components/dashboard/modals'

import { cardService } from 'services'

export const useEditCard = (
  cardId: string,
  reset: UseFormReset<CardSchema>
) => {
  const queryClient = useQueryClient()

  const { close } = useModal(EditCardModal)

  return useMutation({
    mutationKey: ['editCard'],
    mutationFn: (cardData: CardSchema) =>
      cardService.editCard(cardId, cardData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      close()
      reset()
    },
    onError() {
      toast.error(
        'Unexpected error during task update. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
