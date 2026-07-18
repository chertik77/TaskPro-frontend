import type { InferedSession } from '../model/types'

import { queryOptions } from '@tanstack/react-query'

import { authClient } from '@/shared/api'

export const sessionQueries = {
  all: () => ['session'] as const,
  lists: () => [...sessionQueries.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: sessionQueries.lists(),
      queryFn: async () =>
        (await authClient.listSessions()) as unknown as InferedSession[]
    }),
  passkeys: () => [...sessionQueries.all(), 'passkeys'] as const,
  passkey: () =>
    queryOptions({
      queryKey: sessionQueries.passkeys(),
      queryFn: async () => await authClient.listPasskeys()
    }),
  current: () =>
    queryOptions({
      queryKey: sessionQueries.all(),
      queryFn: async () => await authClient.getSession(),
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: false
    })
}
