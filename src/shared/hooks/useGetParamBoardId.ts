import { useParams } from '@tanstack/react-router'

export const useGetParamBoardId = () => {
  const boardId = useParams({
    from: '/(dashboard)/dashboard/$boardId',
    shouldThrow: false
  })

  if (!boardId) throw new Error('Board id is not available on this route.')

  return boardId
}
