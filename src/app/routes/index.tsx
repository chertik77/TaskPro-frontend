import { WelcomePage } from '@/pages/welcome'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSessionStore } from '@/entities/session'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isAuthenticated } = getSessionStore()

    if (isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: WelcomePage
})
