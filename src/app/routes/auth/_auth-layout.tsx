import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { userQueries } from '@/entities/user'

import { AuthNavigation } from '@/widgets/auth-navigation'

export const Route = createFileRoute('/auth/_auth-layout')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuthenticated = await queryClient.ensureQueryData(userQueries.me())

    if (isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <div className='bg-soft-green flex h-dvh items-center justify-center'>
      <div className='tablet:w-106 tablet:p-10 w-84 rounded-lg bg-black p-6'>
        <AuthNavigation />
        <Outlet />
      </div>
    </div>
  )
})
