import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { boardQueries } from '@/entities/board'

import { cardService } from '@/shared/api/card'

export const useUpdateCardOrder = () =>
  useMutation({
    mutationFn: cardService.updateCardOrder,
    meta: { invalidates: [boardQueries.boardKey()] },
    onError() {
      toast.error(
        'Unexpected error during cards reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
