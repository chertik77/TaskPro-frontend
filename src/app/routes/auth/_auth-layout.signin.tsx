import { createFileRoute } from '@tanstack/react-router'

import { SigninPage } from '@/pages/signin'

export const Route = createFileRoute('/auth/_auth-layout/signin')({
  component: SigninPage
})
