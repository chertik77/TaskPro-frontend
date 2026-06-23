import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { cardService } from '@/entities/card'

export const useMoveCard = () =>
  useMutation({
    mutationFn: cardService.editCard,
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while moving the task. Please try again shortly.'
    }
  })
