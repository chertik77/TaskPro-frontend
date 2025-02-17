import { createFileRoute } from '@tanstack/react-router'

import { SignupForm } from '@/features/auth/signup/components'

export const Route = createFileRoute('/(auth)/_auth-layout/signup')({
  component: SignupForm
})
