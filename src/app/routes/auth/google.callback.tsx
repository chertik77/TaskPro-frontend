import { createFileRoute, redirect } from '@tanstack/react-router'

import { GoogleAuthLoader } from '@/features/session/google'

import { SessionContracts } from '@/entities/session'

export const Route = createFileRoute('/auth/google/callback')({
  component: GoogleAuthLoader,
  validateSearch: SessionContracts.GoogleCallbackSearchSchema,
  beforeLoad({ search: { code, state } }) {
    if (!code || !state) throw redirect({ to: '/' })
  }
})
