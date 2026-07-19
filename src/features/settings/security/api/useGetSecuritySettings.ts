import { useQueries } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

export const useGetSecuritySettings = () =>
  useQueries({
    queries: [sessionQueries.list(), sessionQueries.passkey()],
    combine: results => ({
      sessions: results[0].data,
      passkeys: results[1].data,
      isPending: results.some(result => result.isPending)
    })
  })
