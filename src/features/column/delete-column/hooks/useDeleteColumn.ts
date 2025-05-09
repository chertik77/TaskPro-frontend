import { useMutation } from '@tanstack/react-query'

// import { useDragAndDrop } from '@/features/drag-and-drop'

import { columnService } from '@/shared/api/column'

// eslint-disable-next-line arrow-body-style
export const useDeleteColumn = () => {
  // const { setColumns, setCards } = useDragAndDrop()

  return useMutation({
    mutationFn: columnService.deleteColumn,
    meta: { invalidates: [['board']] }
    // onMutate: async ({ columnId }) => {
    //   setColumns(prevColumns => prevColumns?.filter(c => c.id !== columnId))
    //   setCards(prevCards => prevCards?.filter(c => c.columnId !== columnId))
    // }
  })
}
