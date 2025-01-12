import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { store } from 'store'

import { AuthFormNavigation, AuthLayout } from 'features/auth/components'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: () => {
    const isLoggedIn = store.getState().user.isLoggedIn

    console.log(isLoggedIn)
    if (isLoggedIn) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: () => (
    <AuthLayout>
      <AuthFormNavigation />
      <Outlet />
    </AuthLayout>
  )
})
