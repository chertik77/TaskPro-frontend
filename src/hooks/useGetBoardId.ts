import { useLocation } from 'react-router-dom'

export const useGetBoardId = () => {
  const { pathname } = useLocation()

  const pathParts = pathname.split('/')
  const boardId = pathParts[pathParts.length - 1]

  if (boardId) return boardId
}
