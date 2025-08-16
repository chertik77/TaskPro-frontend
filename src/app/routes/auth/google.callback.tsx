import { GoogleCallbackPage } from '@/pages/google-callback'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { SessionContracts } from '@/entities/session'

export const Route = createFileRoute('/auth/google/callback')({
  component: GoogleCallbackPage,
  validateSearch: SessionContracts.GoogleCallbackSearchSchema,
  beforeLoad({ search: { code, state } }) {
    if (!code || !state) throw redirect({ to: '/' })
  }
})
