import { useLocation } from 'react-router-dom'

export const useGetBoardId = () => {
  const { pathname } = useLocation()

  const boardId = pathname.split('/').pop()

  if (boardId) return boardId

  throw new Error('Board id is not available')
}
