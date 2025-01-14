/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { QueryKey } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {
  matchQuery,
  MutationCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'

import { routeTree } from './routeTree.gen'

import 'react-responsive-modal/styles.css'
import './index.css'

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

const router = createRouter({ routeTree, defaultPendingMinMs: 0 })

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
    mutationMeta: {
      invalidates?: QueryKey[]
    }
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
