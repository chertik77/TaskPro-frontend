import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { AuthTabs } from '@/widgets/auth-tabs'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: ({ context: { session } }) => {
    if (session.isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <div className='bg-soft-green flex h-dvh items-center justify-center'>
      <AuthTabs>
        <Outlet />
      </AuthTabs>
    </div>
  )
})
