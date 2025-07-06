import type { ReactNode } from 'react'

import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/shared/lib'

export const QueryClientProvider = ({ children }: { children: ReactNode }) => (
  <TanStackQueryClientProvider client={queryClient}>
    {children}
  </TanStackQueryClientProvider>
)
