import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useGetParamBoardId } from '@/entities/board'

import { getBoardByIdOptions } from '@/shared/api'

export const useGetFilteredColumns = (taskColumnId: string) => {
  const boardId = useGetParamBoardId()

  const { data: columns } = useQuery({
    ...getBoardByIdOptions({ path: { boardId } }),
    select: board => board.columns,
    refetchOnMount: false
  })

  const filteredColumns = useMemo(
    () => columns?.filter(c => c.id !== taskColumnId),
    [columns, taskColumnId]
  )

  return { columns, filteredColumns }
}
