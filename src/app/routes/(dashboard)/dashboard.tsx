import { DashboardPage } from '@/pages/dashboard'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getAuthStore } from '@/shared/store'

export const Route = createFileRoute('/(dashboard)/dashboard')({
  beforeLoad: () => {
    const { isAuthenticated } = getAuthStore()

    if (!isAuthenticated) throw redirect({ to: '/' })
  },
  component: DashboardPage
})
