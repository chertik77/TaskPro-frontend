import { useParams } from 'react-router-dom'

export const useGetBoardId = () => {
  const { boardId } = useParams<{ boardId: string }>()

  return boardId ?? ''
}
