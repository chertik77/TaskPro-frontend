import { useMutation } from '@tanstack/react-query'

import { columnService } from '@/entities/column'
import { useDragAndDrop } from '@/entities/dnd'

export const useDeleteColumn = () => {
  const { setColumns, setCards } = useDragAndDrop()

  return useMutation({
    mutationFn: (columnId: string) => columnService.deleteColumn(columnId),
    meta: { invalidates: [['board']] },
    onMutate: async columnId => {
      setColumns(prevColumns => prevColumns?.filter(c => c.id !== columnId))
      setCards(prevCards => prevCards?.filter(c => c.columnId !== columnId))
    }
  })
}
