import { GoogleOAuthProvider } from '@react-oauth/google'

import { env } from '@/shared/config'

import { QueryClientProvider } from './QueryClientProvider'
import { RouterProvider } from './RouteProvider'
import { ToastProvider } from './ToastProvider'

export const Providers = () => (
  <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
    <QueryClientProvider>
      <RouterProvider />
      <ToastProvider />
    </QueryClientProvider>
  </GoogleOAuthProvider>
)
