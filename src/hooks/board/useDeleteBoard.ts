import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useAppMutation } from 'hooks'

import { Pages } from 'config'
import { boardService } from 'services'

import { useGetBoardId } from '.'

export const useDeleteBoard = () => {
  const navigate = useNavigate()

  const boardId = useGetBoardId()

  const queryClient = useQueryClient()

  return useAppMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: () => boardService.deleteBoard(boardId!),
    toastErrorMessage:
      'An error occurred while deleting the board. Our technical team has been notified. Please try again shortly.',
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      navigate(Pages.Dashboard, { replace: true })
    }
  })
}
