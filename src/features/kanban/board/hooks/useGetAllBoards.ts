import { useQuery } from '@tanstack/react-query'

import { boardService } from '@/shared/api/board'

export const useGetAllBoards = () =>
  useQuery({
    queryKey: ['boards'],
    queryFn: boardService.getAllBoards
  })
