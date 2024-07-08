import { useLocation } from 'react-router-dom'

export const useGetBoardId = () => {
  const { pathname } = useLocation()

  const boardId = pathname.split('/').pop()

  return boardId
}
