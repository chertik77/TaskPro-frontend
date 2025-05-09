import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/shared/api/card'

export const useUpdateCardOrder = () =>
  useMutation({
    mutationFn: cardService.updateCardOrder,
    meta: { invalidates: [['board']] },
    onError() {
      toast.error(
        'Unexpected error during cards reordering. We apologize for the inconvenience. Please try again later.'
      )
    }
  })
