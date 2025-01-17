import type { ColumnTypes } from '@/shared/api/column'
import type { UseFormReset } from 'react-hook-form'

import { BoardCacheKeys } from '@/features/kanban/board/config'
import { useGetParamBoardId } from '@/features/kanban/board/hooks'
import { columnService } from '@/shared/api/column'
import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { AddColumnModal } from '../components/modals'
import { ColumnCacheKeys } from '../config'

export const useAddColumn = (reset: UseFormReset<ColumnTypes.ColumnSchema>) => {
  const { close: closeAddColumnModal } = useModal(AddColumnModal)

  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationKey: [ColumnCacheKeys.AddColumn],
    mutationFn: ({ title }: ColumnTypes.ColumnSchema) =>
      columnService.addNewColumn(boardId!, { title }),
    meta: { invalidates: [[BoardCacheKeys.Board]] },
    onSuccess() {
      closeAddColumnModal()
      reset()
    },
    onError() {
      toast.error(
        'An error occurred while creating the column. Please try again shortly.'
      )
    }
  })
}
