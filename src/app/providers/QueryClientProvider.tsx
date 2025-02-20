import type { PropsWithChildren } from 'react'

import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/shared/lib/react-query'

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <TanStackQueryClientProvider client={queryClient}>
    {children}
  </TanStackQueryClientProvider>
)
