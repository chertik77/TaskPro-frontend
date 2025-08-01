import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { boardQueries, useGetParamBoardId } from '@/entities/board'

export const useGetFilteredColumns = (cardColumnId: string) => {
  const boardId = useGetParamBoardId()

  const { data: columns } = useQuery({
    ...boardQueries.detail(boardId),
    select: board => board.columns,
    refetchOnMount: false
  })

  const filteredColumns = useMemo(
    () => columns?.filter(c => c.id !== cardColumnId),
    [columns, cardColumnId]
  )

  return { columns, filteredColumns }
}
