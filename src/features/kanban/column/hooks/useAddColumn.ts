import type { UseFormReset } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'
import { useGetBoardId } from 'features/kanban/board/hooks'
import { TitleSchema } from 'features/kanban/shared/schema'

import { columnService } from '../column.service'
import { AddColumnModal } from '../components/modals'
import { ColumnCacheKeys } from '../config'

export const useAddColumn = (reset: UseFormReset<TitleSchema>) => {
  const queryClient = useQueryClient()

  const { close: closeAddColumnModal } = useModal(AddColumnModal)

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [ColumnCacheKeys.AddColumn],
    mutationFn: ({ title }: TitleSchema) =>
      columnService.addNewColumn(boardId!, { title }),
    onSuccess() {
      closeAddColumnModal()
      reset()
      queryClient.invalidateQueries({ queryKey: [BoardCacheKeys.Board] })
    },
    onError() {
      toast.error(
        'An error occurred while creating the column. Please try again shortly.'
      )
    }
  })
}
