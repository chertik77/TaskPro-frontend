import { useParams } from '@tanstack/react-router'

export const useGetParamBoardId = () => {
  const params = useParams({
    from: '/dashboard/$boardId',
    shouldThrow: false
  })

  const boardId = params?.boardId

  if (!boardId) throw new Error('Board id is not available on this route.')

  return boardId
}
