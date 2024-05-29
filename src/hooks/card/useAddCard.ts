import type { CardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useQueryClient } from '@tanstack/react-query'
import { useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { useAppMutation } from 'hooks/useAppMutation'

import { cardService } from 'services'

export const useAddCard = (
  reset: UseFormReset<CardSchema>,
  close: () => void
) => {
  const queryClient = useQueryClient()

  const { data: column } = useModalInstance<string>()

  return useAppMutation<CardSchema>({
    mutationKey: ['addCard'],
    mutationFn: data => cardService.addNewCard(column, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      reset()
      close()
    },
    onError() {
      toast.error(
        'Unexpected error during task creation. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
}
