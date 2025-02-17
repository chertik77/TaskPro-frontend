import { createFileRoute } from '@tanstack/react-router'

import { SigninForm } from '@/features/auth/signin/components'

export const Route = createFileRoute('/(auth)/_auth-layout/signin')({
  component: SigninForm
})
