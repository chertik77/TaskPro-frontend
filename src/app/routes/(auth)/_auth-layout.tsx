import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useAuthStore } from '@/entities/auth'

import { AuthFormNavigation, AuthLayout } from '@/blocks/auth-layout'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: () => {
    if (useAuthStore.getState().signedIn()) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <AuthLayout>
      <AuthFormNavigation />
      <Outlet />
    </AuthLayout>
  )
})
