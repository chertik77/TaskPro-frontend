import { createFileRoute } from '@tanstack/react-router'

import { SignupPage } from '@/pages/signup'

export const Route = createFileRoute('/auth/_auth-layout/signup')({
  component: SignupPage
})
