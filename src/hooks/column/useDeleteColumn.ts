import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDragAndDrop } from 'context/dnd.context'

import { useGetBoardId } from 'hooks/board'

import { CacheKeys } from 'config'
import { columnService } from 'services'

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()

  const { setColumns, setCards } = useDragAndDrop()

  const boardId = useGetBoardId()

  return useMutation({
    mutationKey: [CacheKeys.DeleteColumn],
    mutationFn: (columnId: string) => columnService.deleteColumn(columnId),
    onMutate: async columnId => {
      setColumns(prevColumns => prevColumns?.filter(c => c.id !== columnId))
      setCards(prevCards => prevCards?.filter(c => c.columnId !== columnId))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Board, boardId] })
    }
  })
}
