import type { PropsWithChildren } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { env } from '@/shared/config'

export const GoogleProvider = ({ children }: PropsWithChildren) => (
  <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
    {children}
  </GoogleOAuthProvider>
)
