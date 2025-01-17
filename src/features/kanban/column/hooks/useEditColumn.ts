import type { BoardTypes } from '@/shared/api/board'
import type { ColumnTypes } from '@/shared/api/column'
import type { UseFormReset } from 'react-hook-form'

import { useGetParamBoardId } from '@/features/kanban/board/hooks'
import { columnService } from '@/shared/api/column'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditColumnModal } from '../components/modals/EditColumnModal'

export const useEditColumn = (
  reset: UseFormReset<ColumnTypes.ColumnSchema>
) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditColumnModal } = useModal(EditColumnModal)

  return useMutation({
    mutationKey: ['editColumn'],
    mutationFn: ({
      columnId,
      data
    }: {
      columnId: string
      data: ColumnTypes.ColumnSchema
    }) => columnService.editColumn(columnId, data),
    onMutate: async ({ columnId, data: { title } }) => {
      await queryClient.cancelQueries({
        queryKey: ['board', boardId]
      })

      closeEditColumnModal()
      reset()

      const previousBoard = queryClient.getQueryData<BoardTypes.Board>([
        'board',
        boardId
      ])

      queryClient.setQueryData<BoardTypes.Board>(
        ['board', boardId],
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
      queryClient.setQueryData(['board', boardId], context?.previousBoard),
        toast.error(
          'An error occurred while editing the column. Please try again shortly.'
        )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', boardId]
      })
    }
  })
}
