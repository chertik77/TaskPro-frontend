import { useQuery } from '@tanstack/react-query'

import { boardService } from '@/entities/board'

export const useGetAllBoards = () =>
  useQuery({
    queryKey: ['boards'],
    queryFn: boardService.getAllBoards
  })
