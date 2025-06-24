import { SigninPage } from '@/pages/signin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth-layout/signin')({
  component: SigninPage
})
