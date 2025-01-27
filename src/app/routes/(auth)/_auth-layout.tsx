import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from 'store'

import { AuthFormNavigation, AuthLayout } from 'features/auth/components'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: () => {
    if (useAuthStore.getState().isLoggedIn) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <AuthLayout>
      <AuthFormNavigation />
      <Outlet />
    </AuthLayout>
  )
})
