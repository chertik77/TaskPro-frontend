import { useParams } from '@tanstack/react-router'

export const useGetParamBoardId = () => useParams({ strict: false })
