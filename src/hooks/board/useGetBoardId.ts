import { useParams } from 'react-router-dom'

export const useGetBoardId = () => {
  const { boardId } = useParams<{ boardId: string }>()

  if (!boardId) throw new Error('boardId is not available')

  return boardId
}
