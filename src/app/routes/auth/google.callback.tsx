import { GoogleCallbackPage } from '@/pages/auth'
import { createFileRoute } from '@tanstack/react-router'

import { SessionContracts } from '@/entities/session'

export const Route = createFileRoute('/auth/google/callback')({
  component: GoogleCallbackPage,
  validateSearch: SessionContracts.GoogleCallbackSearchSchema
})
