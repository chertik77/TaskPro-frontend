import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Pages } from 'config'
import { boardService } from 'services'

import { useGetBoardId } from '.'

export const useDeleteBoard = () => {
  const navigate = useNavigate()

  const boardId = useGetBoardId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: () => boardService.deleteBoard(boardId!),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      navigate(Pages.Dashboard, { replace: true })
    },
    onError() {
      toast.error(
        'An error occurred while deleting the board. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
}
