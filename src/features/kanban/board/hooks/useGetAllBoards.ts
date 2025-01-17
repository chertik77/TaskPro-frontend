import { boardService } from '@/shared/api/board'
import { useQuery } from '@tanstack/react-query'

export const useGetAllBoards = () =>
  useQuery({
    queryKey: ['boards'],
    queryFn: boardService.getAllBoards
  })
