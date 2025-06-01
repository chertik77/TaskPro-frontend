import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { useGetParamBoardId } from '@/shared/hooks'

export const useGetFilteredColumns = (cardColumnId: string) => {
  const boardId = useGetParamBoardId()

  const { data: columns } = useQuery({
    ...boardQueries.board(boardId),
    select: board => board.columns,
    refetchOnMount: false
  })

  const filteredColumns = useMemo(
    () => columns?.filter(c => c.id !== cardColumnId),
    [columns, cardColumnId]
  )

  return { columns, filteredColumns }
}
