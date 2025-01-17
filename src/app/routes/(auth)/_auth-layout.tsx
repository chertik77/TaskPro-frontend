import { AuthFormNavigation, AuthLayout } from '@/features/auth/components'
import { useAuthStore } from '@/shared/store'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

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
