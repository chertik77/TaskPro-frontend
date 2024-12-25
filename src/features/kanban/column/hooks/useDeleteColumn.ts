import { useMutation, useQueryClient } from '@tanstack/react-query'

import { BoardCacheKeys } from 'features/kanban/board/config'
import { useGetBoardId } from 'features/kanban/board/hooks'
import { useDragAndDrop } from 'features/kanban/dnd/hooks'

import { columnService } from '../column.service'
import { ColumnCacheKeys } from '../config'

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()

  const { setColumns, setCards } = useDragAndDrop()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [ColumnCacheKeys.DeleteColumn],
    mutationFn: (columnId: string) => columnService.deleteColumn(columnId),
    onMutate: async columnId => {
      setColumns(prevColumns => prevColumns?.filter(c => c.id !== columnId))
      setCards(prevCards => prevCards?.filter(c => c.columnId !== columnId))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BoardCacheKeys.Board, boardId]
      })
    }
  })
}
