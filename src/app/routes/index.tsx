import { WelcomePage } from '@/pages/welcome'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context: { session } }) => {
    if (session.isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: WelcomePage
})
