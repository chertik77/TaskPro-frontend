import { BoardCacheKeys } from '@/features/kanban/board/config'
import { useDragAndDrop } from '@/features/kanban/dnd/hooks'
import { columnService } from '@/shared/api/column'
import { useMutation } from '@tanstack/react-query'

import { ColumnCacheKeys } from '../config'

export const useDeleteColumn = () => {
  const { setColumns, setCards } = useDragAndDrop()

  return useMutation({
    mutationKey: [ColumnCacheKeys.DeleteColumn],
    mutationFn: (columnId: string) => columnService.deleteColumn(columnId),
    meta: { invalidates: [[BoardCacheKeys.Board]] },
    onMutate: async columnId => {
      setColumns(prevColumns => prevColumns?.filter(c => c.id !== columnId))
      setCards(prevCards => prevCards?.filter(c => c.columnId !== columnId))
    }
  })
}
