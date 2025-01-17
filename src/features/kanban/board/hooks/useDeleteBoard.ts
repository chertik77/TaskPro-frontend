import { boardService, BoardTypes } from '@/shared/api/board'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useGetParamBoardId } from './useGetParamBoardId'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const navigate = useNavigate()

  return useMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: () => boardService.deleteBoard(boardId!),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['boards'] })

      const previousBoards = queryClient.getQueryData<BoardTypes.Board[]>([
        'boards'
      ])

      queryClient.setQueryData<BoardTypes.Board[]>(
        ['boards'],
        oldBoards => oldBoards && oldBoards.filter(b => b.id !== boardId)
      )

      navigate({ to: '/dashboard', replace: true })

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['boards'], context?.previousBoards),
        toast.error(
          'An error occurred while deleting the board. Please try again shortly.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    }
  })
}
