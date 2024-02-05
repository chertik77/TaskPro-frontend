import { createLazyFileRoute } from '@tanstack/react-router'
import { SigninPage } from 'pages'

export const Route = createLazyFileRoute('/auth/signin')({
  component: SigninPage
})
