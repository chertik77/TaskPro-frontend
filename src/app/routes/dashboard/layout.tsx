import { DashboardPage } from '@/pages/dashboard'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuthenticated = await queryClient.ensureQueryData(
      sessionQueries.current()
    )

    if (!isAuthenticated) throw redirect({ to: '/' })
  },
  component: DashboardPage
})
