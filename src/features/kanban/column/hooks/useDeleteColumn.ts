import { useDragAndDrop } from '@/features/kanban/dnd/hooks'
import { columnService } from '@/shared/api/column'
import { useMutation } from '@tanstack/react-query'

export const useDeleteColumn = () => {
  const { setColumns, setCards } = useDragAndDrop()

  return useMutation({
    mutationKey: ['deleteColumn'],
    mutationFn: (columnId: string) => columnService.deleteColumn(columnId),
    meta: { invalidates: [['board']] },
    onMutate: async columnId => {
      setColumns(prevColumns => prevColumns?.filter(c => c.id !== columnId))
      setCards(prevCards => prevCards?.filter(c => c.columnId !== columnId))
    }
  })
}
