import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { authService } from 'features/auth/auth.service'
import { AuthFormNavigation, AuthLayout } from 'features/auth/components'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: () => {
    const isSignedIn = authService.isSignedIn()
    if (isSignedIn) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <AuthLayout>
      <AuthFormNavigation />
      <Outlet />
    </AuthLayout>
  )
})
