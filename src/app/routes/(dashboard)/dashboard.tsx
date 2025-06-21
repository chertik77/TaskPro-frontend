import { DashboardPage } from '@/pages/dashboard'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSessionStore } from '@/entities/session'

export const Route = createFileRoute('/(dashboard)/dashboard')({
  beforeLoad: () => {
    const { isAuthenticated } = getSessionStore()

    if (!isAuthenticated) throw redirect({ to: '/' })
  },
  component: DashboardPage
})
