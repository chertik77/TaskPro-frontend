import { GoogleOAuthProvider } from '@react-oauth/google'

import { QueryClientProvider } from './QueryClientProvider'
import { RouterProvider } from './RouteProvider'

export const Providers = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  </GoogleOAuthProvider>
)
