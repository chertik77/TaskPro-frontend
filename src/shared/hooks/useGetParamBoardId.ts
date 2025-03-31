import { useParams } from '@tanstack/react-router'

export const useGetParamBoardId = () =>
  useParams({ from: '/(dashboard)/dashboard/$boardId' })
