import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { AuthTabs } from '@/blocks/auth-tabs'

import { getAuthStore } from '@/shared/store'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: () => {
    const { isAuthenticated } = getAuthStore()

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
