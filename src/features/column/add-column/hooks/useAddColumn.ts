import type { ColumnTypes } from '@/entities/column'
import type { UseFormReset } from 'react-hook-form'

import { columnService } from '@/entities/column'
import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { useGetParamBoardId } from '@/shared/hooks'

import { AddColumnModal } from '..'

export const useAddColumn = (reset: UseFormReset<ColumnTypes.ColumnSchema>) => {
  const { close: closeAddColumnModal } = useModal(AddColumnModal)

  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationKey: ['addColumn'],
    mutationFn: ({ title }: ColumnTypes.ColumnSchema) =>
      columnService.addNewColumn(boardId!, { title }),
    meta: { invalidates: [['board']] },
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
