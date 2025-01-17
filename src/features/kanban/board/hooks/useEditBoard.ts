import type { UseFormReset } from 'react-hook-form'
import type { BoardTypes } from 'shared/api/board'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { boardService } from 'shared/api/board'
import { toast } from 'sonner'

import { EditBoardModal } from '../components/modals'
import { BoardCacheKeys } from '../config'
import { useGetParamBoardId } from './useGetParamBoardId'

export const useEditBoard = (reset: UseFormReset<BoardTypes.BoardSchema>) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditBoardModal } = useModal(EditBoardModal)

  return useMutation({
    mutationKey: [BoardCacheKeys.EditBoard],
    mutationFn: (data: BoardTypes.BoardSchema) =>
      boardService.editBoard(boardId!, data),
    onMutate: async ({ title, icon }) => {
      await queryClient.cancelQueries({ queryKey: [BoardCacheKeys.Boards] })

      closeEditBoardModal()
      reset()

      const previousBoards = queryClient.getQueryData<BoardTypes.Board[]>([
        BoardCacheKeys.Boards
      ])

      queryClient.setQueryData<BoardTypes.Board[]>(
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
