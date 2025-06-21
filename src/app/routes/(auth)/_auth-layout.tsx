import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { getSessionStore } from '@/entities/session'

import { AuthTabs } from '@/widgets/auth-tabs'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: () => {
    const { isAuthenticated } = getSessionStore()

    if (isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <div className='bg-soft-green flex h-dvh items-center justify-center'>
      <AuthTabs>
        <Outlet />
      </AuthTabs>
    </div>
  )
})
