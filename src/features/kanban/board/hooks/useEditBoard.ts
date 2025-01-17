import type { BoardTypes } from '@/shared/api/board'
import type { UseFormReset } from 'react-hook-form'

import { boardService } from '@/shared/api/board'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditBoardModal } from '../components/modals'
import { useGetParamBoardId } from './useGetParamBoardId'

export const useEditBoard = (reset: UseFormReset<BoardTypes.BoardSchema>) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditBoardModal } = useModal(EditBoardModal)

  return useMutation({
    mutationKey: ['editBoard'],
    mutationFn: (data: BoardTypes.BoardSchema) =>
      boardService.editBoard(boardId!, data),
    onMutate: async ({ title, icon }) => {
      await queryClient.cancelQueries({ queryKey: ['boards'] })

      closeEditBoardModal()
      reset()

      const previousBoards = queryClient.getQueryData<BoardTypes.Board[]>([
        'boards'
      ])

      queryClient.setQueryData<BoardTypes.Board[]>(
        ['boards'],
        oldBoards =>
          oldBoards &&
          oldBoards.map(b => (b.id === boardId ? { ...b, title, icon } : b))
      )

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['boards'], context?.previousBoards),
        toast.error(
          'An error occurred while editing the board. Please try again shortly.'
        )
    },
    onSettled: data => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })

      if (data?.id === boardId) {
        queryClient.invalidateQueries({ queryKey: ['board'] })
      }
    }
  })
}
