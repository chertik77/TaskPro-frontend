import { createFileRoute } from '@tanstack/react-router'

import { GoogleAuthLoader } from '@/features/session/google'

import { SessionContracts } from '@/entities/session'

export const Route = createFileRoute('/auth/google/callback')({
  component: GoogleAuthLoader,
  validateSearch: SessionContracts.GoogleCallbackSearchSchema
})
