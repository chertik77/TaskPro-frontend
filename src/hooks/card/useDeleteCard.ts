import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGetBoardId } from 'hooks/board'

import { CacheKeys } from 'constants/cache-keys'
import { cardService } from 'services'

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [CacheKeys.DeleteCard],
    mutationFn: (cardId: string) => cardService.deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board, boardId] })
    },
    onError: () => {
      toast.error(
        'An error occurred while deleting the task. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
}
