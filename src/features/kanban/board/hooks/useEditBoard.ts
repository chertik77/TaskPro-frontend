import type { UseFormReset } from 'react-hook-form'
import type { BoardSchema } from '../board.schema'
import type { Board } from '../board.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { boardService } from '../board.service'
import { EditBoardModal } from '../components/modals'
import { BoardCacheKeys } from '../config'
import { useGetParamBoardId } from './useGetParamBoardId'

export const useEditBoard = (reset: UseFormReset<BoardSchema>) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditBoardModal } = useModal(EditBoardModal)

  return useMutation({
    mutationKey: [BoardCacheKeys.EditBoard],
    mutationFn: (data: BoardSchema) => boardService.editBoard(boardId!, data),
    onMutate: async ({ title, icon }) => {
      await queryClient.cancelQueries({ queryKey: [BoardCacheKeys.Boards] })

      closeEditBoardModal()
      reset()

      const previousBoards = queryClient.getQueryData<Board[]>([
        BoardCacheKeys.Boards
      ])

      queryClient.setQueryData<Board[]>(
        [BoardCacheKeys.Boards],
        oldBoards =>
          oldBoards &&
          oldBoards.map(b => (b.id === boardId ? { ...b, title, icon } : b))
      )

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [BoardCacheKeys.Boards],
        context?.previousBoards
      ),
        toast.error(
          'An error occurred while editing the board. Please try again shortly.'
        )
    },
    onSettled: data => {
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Boards] })

      if (data?.id === boardId) {
        queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Board] })
      }
    }
  })
}
