import { useLocation } from 'react-router-dom'

export const useBoardNameByLocation = () => {
  const { pathname } = useLocation()

  const pathParts = pathname.split('/')
  const boardName = pathParts[pathParts.length - 1]

  return boardName
}
