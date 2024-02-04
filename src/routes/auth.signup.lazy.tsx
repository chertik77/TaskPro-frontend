import { createLazyFileRoute } from '@tanstack/react-router'
import { SignupPage } from 'pages/SignupPage'

export const Route = createLazyFileRoute('/auth/signup')({
  component: SignupPage
})
