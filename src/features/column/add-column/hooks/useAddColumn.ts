import type { ColumnDtoTypes } from '@/shared/api/column'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import type { AddColumnSchema } from '../add-column.contract'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from '@/shared/api/column'
import { useGetParamBoardId } from '@/shared/hooks'

export const useAddColumn = (
  reset: UseFormReset<AddColumnSchema>,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: Omit<ColumnDtoTypes.AddColumnDto, 'boardId'>) =>
      columnService.addColumn({ boardId: boardId!, ...data }),
    meta: { invalidates: [['board']] },
    onSuccess() {
      setIsDialogOpen(false)
      reset()
    },
    onError() {
      toast.error(
        'An error occurred while creating the column. Please try again shortly.'
      )
    }
  })
}
