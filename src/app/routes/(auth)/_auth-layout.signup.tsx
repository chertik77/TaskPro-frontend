import { createFileRoute } from '@tanstack/react-router'

import { SignupForm } from '@/features/auth/signup'

export const Route = createFileRoute('/(auth)/_auth-layout/signup')({
  component: SignupForm
})
