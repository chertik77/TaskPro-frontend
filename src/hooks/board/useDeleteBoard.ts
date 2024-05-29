import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAppMutation } from 'hooks/useAppMutation'

import { boardService } from 'services'

export const useDeleteBoard = (boardId: string) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return useAppMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: () => boardService.deleteBoard(boardId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      navigate('/dashboard', { replace: true })
    },
    onError() {
      toast.error(
        'An error occurred while deleting the board. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
}
