import type { ColumnDtoTypes } from '@/shared/api/column'
import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { boardQueries } from '@/entities/board'

import { columnService } from '@/shared/api/column'
import { useGetParamBoardId } from '@/shared/hooks'

export const useAddColumn = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: (data: Omit<ColumnDtoTypes.AddColumnDto, 'boardId'>) =>
      columnService.addColumn({ boardId: boardId!, ...data }),
    meta: { invalidates: [boardQueries.boardKey()] },
    onSuccess() {
      setIsDialogOpen(false)
    },
    onError() {
      toast.error(
        'An error occurred while creating the column. Please try again shortly.'
      )
    }
  })
}
