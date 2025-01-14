import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { BoardCacheKeys } from 'features/kanban/board/config'
import { useGetParamBoardId } from 'features/kanban/board/hooks'
import { TitleSchema } from 'features/kanban/shared/schema'

import { columnService } from '../column.service'
import { AddColumnModal } from '../components/modals'
import { ColumnCacheKeys } from '../config'

export const useAddColumn = (reset: UseFormReset<TitleSchema>) => {
  const { close: closeAddColumnModal } = useModal(AddColumnModal)

  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationKey: [ColumnCacheKeys.AddColumn],
    mutationFn: ({ title }: TitleSchema) =>
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
