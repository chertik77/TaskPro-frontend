import { createLazyFileRoute } from '@tanstack/react-router'
import { SignupPage } from 'pages'

export const Route = createLazyFileRoute('/auth/signup')({
  component: SignupPage
})
