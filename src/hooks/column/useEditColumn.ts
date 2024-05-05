import type { ColumnSchemaFields } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useBoardByLocation } from 'hooks/useBoardByLocation'

import { columnService } from 'services/column.service'

export const useEditColumn = (columnId: string) => {
  const boardId = useBoardByLocation()

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['editColumn'],
    mutationFn: (data: ColumnSchemaFields) =>
      columnService.editColumn(boardId!, columnId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    }
  })
}
