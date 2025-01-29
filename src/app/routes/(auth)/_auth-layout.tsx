import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { AuthFormNavigation, AuthLayout } from '@/features/auth/components'

import { useAuthStore } from '@/shared/store'

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
