import { useQueries } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

export const useGetSessions = () =>
  useQueries({ queries: [sessionQueries.list(), sessionQueries.list()] })
