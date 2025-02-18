import type { BoardTypes } from '@/entities/board'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { boardService } from '@/entities/board'

import { useGetParamBoardId } from '@/shared/hooks'

import { EditBoardModal } from '..'

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
