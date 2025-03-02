import { createLazyFileRoute } from '@tanstack/react-router'

import { SigninForm } from '@/features/auth/signin'

export const Route = createLazyFileRoute('/(auth)/_auth-layout/signin')({
  component: SigninForm
})
