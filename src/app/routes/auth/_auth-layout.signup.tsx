import { SignupPage } from '@/pages/signup'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_auth-layout/signup')({
  component: SignupPage
})
