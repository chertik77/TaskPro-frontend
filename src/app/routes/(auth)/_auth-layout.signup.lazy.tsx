import { createLazyFileRoute } from '@tanstack/react-router'

import { SignupForm } from '@/features/auth/signup'

export const Route = createLazyFileRoute('/(auth)/_auth-layout/signup')({
  component: SignupForm
})
