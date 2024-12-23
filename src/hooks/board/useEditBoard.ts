import type { BoardSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { Board } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditBoardModal } from 'components/dashboard/modals'

import { CacheKeys } from 'config'
import { boardService } from 'services'

import { useGetBoardId } from './useGetBoardId'

export const useEditBoard = (reset: UseFormReset<BoardSchema>) => {
  const queryClient = useQueryClient()

  const boardId = useGetBoardId()

  const { close } = useModal(EditBoardModal)

  return useMutation({
    mutationKey: [CacheKeys.EditBoard],
    mutationFn: (data: BoardSchema) => boardService.editBoard(boardId!, data),
    onMutate: async ({ title, icon }) => {
      await queryClient.cancelQueries({ queryKey: [CacheKeys.Boards] })

      close()
      reset()

      const previousBoards = queryClient.getQueryData<Board[]>([
        CacheKeys.Boards
      ])

      queryClient.setQueryData<Board[]>(
        [CacheKeys.Boards],
        oldBoards =>
          oldBoards &&
          oldBoards.map(b => (b.id === boardId ? { ...b, title, icon } : b))
      )

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([CacheKeys.Boards], context?.previousBoards),
        toast.error(
          'Failed to update the board. Please try again. If the problem persists, contact support.'
        )
    },
    onSettled: data => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Boards] })

      if (data?.id === boardId) {
        queryClient.invalidateQueries({ queryKey: [CacheKeys.Board] })
      }
    }
  })
}
