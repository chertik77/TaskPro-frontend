import type { ColumnSchemaFields } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useBoardByLocation } from 'hooks/useBoardByLocation'

import { columnService } from 'services/column.service'

export const useAddColumn = () => {
  const boardId = useBoardByLocation()

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['column'],
    mutationFn: (data: ColumnSchemaFields) =>
      columnService.addNewColumn(boardId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    }
  })
}
