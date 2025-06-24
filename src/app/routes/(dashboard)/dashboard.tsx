import { DashboardPage } from '@/pages/dashboard'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/dashboard')({
  beforeLoad: ({ context: { session } }) => {
    if (!session.isAuthenticated) throw redirect({ to: '/' })
  },
  component: DashboardPage
})
