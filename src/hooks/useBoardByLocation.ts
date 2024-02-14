import { useLocation } from 'react-router-dom'

export const useBoardByLocation = () => {
  const { pathname } = useLocation()

  const pathParts = pathname.split('/')
  const boardId = pathParts[pathParts.length - 1]

  return boardId
}
