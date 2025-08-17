import { DashboardPage } from '@/pages/dashboard'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { userQueries } from '@/entities/user'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context: { queryClient } }) => {
    const isAuthenticated = queryClient.getQueryData(userQueries.current())

    if (!isAuthenticated) throw redirect({ to: '/' })
  },
  component: DashboardPage
})
