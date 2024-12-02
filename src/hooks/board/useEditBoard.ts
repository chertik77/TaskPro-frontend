import type { BoardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { Board } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditBoardModal } from 'components/dashboard/modals'

import { boardService } from 'services'

export const useEditBoard = (reset: UseFormReset<BoardSchema>) => {
  const queryClient = useQueryClient()

  const { close } = useModal(EditBoardModal)

  return useMutation({
    mutationKey: ['editBoard'],
    mutationFn: ({
      boardId,
      boardData
    }: {
      boardId: string
      boardData: BoardSchema
    }) => boardService.editBoard(boardId, boardData),
    onMutate: async ({ boardId, boardData: { title, icon } }) => {
      await queryClient.cancelQueries({ queryKey: ['boards'] })

      close()
      reset()

      const previousBoards = queryClient.getQueryData<Board[]>(['boards'])

      queryClient.setQueryData<Board[]>(
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
          'Failed to update the board. Please try again. If the problem persists, contact support.'
        )
    },
    onSettled: (data, _, variables) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })

      if (data?.id === variables.boardId) {
        queryClient.invalidateQueries({ queryKey: ['board'] })
      }
    }
  })
}
