import { SigninPage } from '@/pages/signin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signin')({
  component: SigninPage
})
