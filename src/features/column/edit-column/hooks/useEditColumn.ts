import type { BoardTypes } from '@/entities/board'
import type { UseFormReset } from 'react-hook-form'
import type { EditColumnSchema } from '../edit-column.contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { columnService } from '@/shared/api/column'
import { useGetParamBoardId } from '@/shared/hooks'

import { EditColumnModal } from '../components/EditColumnModal'

export const useEditColumn = (reset: UseFormReset<EditColumnSchema>) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditColumnModal } = useModal(EditColumnModal)

  return useMutation({
    mutationFn: columnService.editColumn,
    onMutate: async ({ columnId, title }) => {
      await queryClient.cancelQueries({
        queryKey: ['board', boardId]
      })

      closeEditColumnModal()
      reset()

      const previousBoard = queryClient.getQueryData<BoardTypes.BoardSchema>([
        'board',
        boardId
      ])

      queryClient.setQueryData<BoardTypes.BoardSchema>(
        ['board', boardId],
        oldBoard =>
          oldBoard && {
            ...oldBoard,
            columns:
              oldBoard.columns &&
              oldBoard.columns.map(column =>
                column.id === columnId
                  ? { ...column, title: title || column.title }
                  : column
              )
          }
      )

      return { previousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['board', boardId], context?.previousBoard)
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
