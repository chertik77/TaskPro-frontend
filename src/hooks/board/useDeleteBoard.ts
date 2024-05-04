import type { Board } from 'types/board.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { boardService } from 'services/board.service'

export const useDeleteBoard = () => {
  const navigate = useNavigate()

  const { boardId } = useParams()

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: () => boardService.deleteBoard(boardId!),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['boards'] }).then(() => {
        const boards = queryClient.getQueryData<Board[]>(['boards'])

        if (boards && boards.length > 0) {
          navigate(`/dashboard/${boards[0]._id}`, { replace: true })
        } else navigate('/dashboard')
      })
      toast.success('Board has been deleted successfully!')
    }
  })
}
