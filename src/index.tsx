/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { AxiosError } from 'axios'

import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'

import { routeTree } from './routeTree.gen'

import 'react-responsive-modal/styles.css'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

const router = createRouter({ routeTree, unmaskOnReload: true })

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
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
