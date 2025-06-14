import { WelcomePage } from '@/pages/welcome'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getAuthStore } from '@/shared/store'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isAuthenticated } = getAuthStore()

    if (isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: WelcomePage
})
