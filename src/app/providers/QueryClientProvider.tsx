import type { QueryKey } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { PropsWithChildren } from 'react'

import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query'
import { queryClient } from 'shared/lib/react-query'

declare module '@tanstack/react-query' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    defaultError: AxiosError
    mutationMeta: {
      invalidates?: QueryKey[]
    }
  }
}

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <TanStackQueryClientProvider client={queryClient}>
    {children}
  </TanStackQueryClientProvider>
)
