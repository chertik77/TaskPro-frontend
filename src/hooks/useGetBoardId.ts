import { useParams } from 'react-router-dom'

export const useGetBoardId = () => {
  const { boardId } = useParams<{ boardId: string }>()

  if (boardId) {
    return boardId
  }

  throw new Error('useGetBoardId must be used within /dashboard/:id path')
}
