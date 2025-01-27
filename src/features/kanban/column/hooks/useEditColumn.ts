import type { Board } from 'features/kanban/board/board.types'
import type { TitleSchema } from 'features/kanban/shared/schema'
import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'
import { useGetParamBoardId } from 'features/kanban/board/hooks'

import { columnService } from '../column.service'
import { EditColumnModal } from '../components/modals/EditColumnModal'
import { ColumnCacheKeys } from '../config'

export const useEditColumn = (reset: UseFormReset<TitleSchema>) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditColumnModal } = useModal(EditColumnModal)

  return useMutation({
    mutationKey: [ColumnCacheKeys.EditColumn],
    mutationFn: ({ columnId, data }: { columnId: string; data: TitleSchema }) =>
      columnService.editColumn(columnId, data),
    onMutate: async ({ columnId, data: { title } }) => {
      await queryClient.cancelQueries({
        queryKey: [BoardCacheKeys.Board, boardId]
      })

      closeEditColumnModal()
      reset()

      const previousBoard = queryClient.getQueryData<Board>([
        BoardCacheKeys.Board,
        boardId
      ])

      queryClient.setQueryData<Board>(
        [BoardCacheKeys.Board, boardId],
        oldBoard =>
          oldBoard && {
            ...oldBoard,
            columns: oldBoard.columns.map(column =>
              column.id === columnId ? { ...column, title } : column
            )
          }
      )

      return { previousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [BoardCacheKeys.Board, boardId],
        context?.previousBoard
      ),
        toast.error(
          'An error occurred while editing the column. Please try again shortly.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BoardCacheKeys.Board, boardId]
      })
    }
  })
}
