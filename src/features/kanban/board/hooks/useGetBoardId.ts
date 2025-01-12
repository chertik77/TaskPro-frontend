import { useParams } from '@tanstack/react-router'

export const useGetBoardId = () => {
  const { boardId } = useParams({ strict: false })

  return boardId as string
}
