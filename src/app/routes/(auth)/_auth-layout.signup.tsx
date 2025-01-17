import { SignupForm } from '@/features/auth/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth-layout/signup')({
  component: SignupForm
})
