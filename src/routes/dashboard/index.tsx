import { createFileRoute, redirect } from '@tanstack/react-router'

import { authService } from 'features/auth/auth.service'

import { DashboardPage } from 'pages'

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: () => {
    const isSignedIn = authService.isSignedIn()
    if (!isSignedIn) throw redirect({ to: '/' })
  },
  component: DashboardPage
})
