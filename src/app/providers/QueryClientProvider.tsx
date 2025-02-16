import type { QueryKey } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { PropsWithChildren } from 'react'

import {
  matchQuery,
  MutationCache,
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider
} from '@tanstack/react-query'

declare module '@tanstack/react-query' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    defaultError: AxiosError
    mutationMeta: {
      invalidates?: QueryKey[]
    }
  }
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        predicate: query =>
          mutation.meta?.invalidates?.some(queryKey =>
            matchQuery({ queryKey }, query)
          ) ?? false
      })
    }
  }),
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <TanStackQueryClientProvider client={queryClient}>
    {children}
  </TanStackQueryClientProvider>
)
